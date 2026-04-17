import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';
import { StateStore } from '../data/StateStore.js';

const TILE_SIZE = 64;
const BASE_MOVE_SPEED = 200;
const FLOW_MOVE_SPEED = 240;
const BASE_JUMP_SPEED = 450;
const FLOW_JUMP_SPEED = 490;
const FLOW_STREAK_THRESHOLD = 3;
const SECRET_ZONE_BONUS = 30;
const MAGMA_STREAK_THRESHOLD = 2;
const PHOTON_STREAK_THRESHOLD = 2;
const DASH_SPEED = 650;
const DASH_DURATION = 180;
const DASH_COOLDOWN = 900;

const POWER_UPS = {
  volcanoes: 'Magma Suit',
  'light-reflection': 'Photon Dash',
};

export class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizScene' });
  }

  init(data) {
    this.topicIndex = data.topicIndex ?? 0;
    this.score = data.score ?? 0;
    this.currentQ = 0;
    this.answered = false;
    this.perfectStreak = 0;
    this.isFlowStateActive = false;
    this.flowEffects = [];
    this.galileoBadges = data.galileoBadges ?? 0;
    this.secretZoneCleared = data.secretZoneCleared ?? false;
    this.returnFromSecret = data.returnFromSecret ?? false;
    this.activeQuestionSet = 'main';
    this.secretPromptVisible = false;
    this.secretEntryPressed = false;
    this.topicId = 'all-topics';
    this.powerUpName = null;
    this.secretQuestionIndex = 0;
    this.subjectStreak = 0;
    this.subjectPowerUnlocked = false;
    this.isDashing = false;
    this.canDash = true;
    this.facing = 1;

    if (this.topicIndex === -1) {
      this.questions = [];
      TOPICS.forEach(topic => {
        const shuffled = Phaser.Utils.Array.Shuffle([...topic.questions]);
        this.questions.push(...shuffled.slice(0, 2));
      });
      Phaser.Utils.Array.Shuffle(this.questions);
      this.topicName = 'All Topics';
      this.topicColor = 0xe94560;
      this.topicEmoji = '🚀';
      this.secretQuestions = Phaser.Utils.Array.Shuffle([...TOPICS[2].questions]).slice(0, 2);
    } else {
      const topic = TOPICS[this.topicIndex];
      this.questions = Phaser.Utils.Array.Shuffle([...topic.questions]);
      this.topicName = topic.name;
      this.topicColor = topic.color;
      this.topicEmoji = topic.emoji;
      this.topicId = topic.id;
      this.powerUpName = POWER_UPS[this.topicId] ?? null;
      this.secretQuestions = Phaser.Utils.Array.Shuffle([...topic.questions]).slice(0, Math.min(2, topic.questions.length));
    }
    this.totalQ = this.questions.length;
    this.secretTotalQ = this.secretQuestions.length;
  }

  create() {
    const { width, height } = this.scale;

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x0f3460, 0x0f3460, 1);
    bg.fillRect(0, 0, width, height);

    this.createLevelTilemap();

    const spawnX = this.returnFromSecret ? 90 : 50;
    this.spawnPoint = new Phaser.Math.Vector2(spawnX, height - 100);
    this.player = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(28, 48, true);
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.add.collider(this.player, this.groundLayer);

    this.createSubjectPowerCourse(width, height);

    this.questionBlocks = this.physics.add.staticGroup();
    this.assessmentWalls = this.physics.add.staticGroup();

    const startX = 150;
    const spacing = (width - 200) / Math.max(1, this.totalQ - 1);

    this.questions.forEach((q, i) => {
      const bx = startX + (i * spacing);
      const by = height - 150 - (i % 2 === 0 ? 0 : 50);
      const block = this.questionBlocks.create(bx, by, 'qblock');
      block.setData('questionIndex', i);
      block.setData('active', true);
      
      // Assessment Zone Wall (invisible gate that blocks progress)
      const wall = this.assessmentWalls.create(bx + 40, height - 80, 'blank'); // Make it an invisible physics body
      wall.body.setSize(20, height); 
      wall.setVisible(false);
      block.setData('wall', wall);
    });

    this.secretPipe = this.physics.add.staticImage(width - 400, height - 80, 'warp_pipe');
    this.secretPipe.setOrigin(0.5, 1);
    this.secretPipe.body.setSize(44, 78).setOffset(10, 18);

    this.exitPipe = this.physics.add.staticImage(width - 50, height - 80, 'warp_pipe');
    this.exitPipe.setOrigin(0.5, 1);
    this.exitPipe.body.setSize(44, 78).setOffset(10, 18);
    this.exitPipe.setTint(0x9be564); // Tint green to distinguish as exit

    this.physics.add.collider(this.player, this.secretPipe);
    this.physics.add.collider(this.player, this.exitPipe);
    this.physics.add.collider(this.player, this.assessmentWalls);
    this.physics.add.collider(this.player, this.questionBlocks, this.hitBlock, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D,SHIFT');

    this.createTopBar(width);
    this.createFlowEffects();
    this.createSecretPrompt(width, height);
    this.refreshPowerUpStatus();

    this.uiContainer = this.add.container(0, 0);
    this.uiContainer.setAlpha(0);

    const uiBg = this.add.graphics();
    uiBg.fillStyle(0x000000, 0.85);
    uiBg.fillRect(0, 0, width, height);
    this.uiContainer.add(uiBg);

    this.contentContainer = this.add.container(0, 0);
    this.uiContainer.add(this.contentContainer);

    this.isUiActive = false;
  }

  createLevelTilemap() {
    const columns = Math.ceil(this.scale.width / TILE_SIZE);
    const rows = Math.ceil(this.scale.height / TILE_SIZE);
    
    // Default flat ground
    const data = Array.from({ length: rows }, (_, row) => (
      Array.from({ length: columns }, () => (row === rows - 1 ? 1 : -1))
    ));
    
    // Topic specific terrain variation
    if (this.topicId === 'volcanoes' || this.topicId === 'earth-structure') {
      // Create a pit
      data[rows - 1][4] = -1;
      data[rows - 1][5] = -1;
      // Add platform
      data[rows - 3][8] = 1;
      data[rows - 3][9] = 1;
    } else if (this.topicId === 'ecosystems' || this.topicId === 'animal-adaptations') {
      // Create stair-steps
      data[rows - 2][3] = 1;
      data[rows - 3][4] = 1;
      data[rows - 4][7] = 1;
    } else if (this.topicId === 'light-reflection' || this.topicId === 'electrical-circuits') {
      // Create tall walls and elevated areas
      data[rows - 2][2] = 1;
      data[rows - 3][2] = 1;
      data[rows - 4][5] = 1;
    }

    const map = this.make.tilemap({
      data,
      tileWidth: TILE_SIZE,
      tileHeight: TILE_SIZE,
    });

    const tileset = map.addTilesetImage('ground', 'ground', TILE_SIZE, TILE_SIZE, 0, 0);
    this.groundLayer = map.createLayer(0, tileset, 0, 0);
    this.groundLayer.setCollision(1);
  }

  createTopBar(width) {
    const headerBg = this.add.graphics();
    headerBg.fillStyle(this.topicColor, 0.9);
    headerBg.fillRect(0, 0, width, 40);

    this.add.text(15, 20, `${this.topicEmoji} ${this.topicName}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0, 0.5);

    this.scoreText = this.add.text(width - 15, 20, `⭐ ${this.score}  Galileo ${this.galileoBadges}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffd700',
    }).setOrigin(1, 0.5);

    this.comboText = this.add.text(width - 200, 20, `Combo ${this.perfectStreak}/${FLOW_STREAK_THRESHOLD}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#9fe7ff',
    }).setOrigin(1, 0.5);

    this.powerUpText = this.add.text(15, 56, this.powerUpName ? `${this.powerUpName} locked` : 'Power-up unavailable', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffe08a',
    }).setOrigin(0, 0.5);

    this.flowText = this.add.text(width / 2, 56, 'FLOW STATE', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#fff4a8',
      stroke: '#ff9f43',
      strokeThickness: 4,
    }).setOrigin(0.5);
    this.flowText.setAlpha(0);

    const backBtn = this.add.text(width / 2, 20, 'Exit Level', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff88',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }

  createFlowEffects() {
    const glow = this.add.circle(this.player.x, this.player.y, 28, 0xfff3a1, 0.28);
    glow.setBlendMode(Phaser.BlendModes.ADD);
    glow.setVisible(false);

    const burst = this.add.particles(0, 0, 'particle', {
      speed: { min: 12, max: 30 },
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.9, end: 0 },
      tint: [0xfff3a1, 0x9fe7ff, 0xff9f43],
      lifespan: 550,
      quantity: 1,
      frequency: 80,
      emitting: false,
      blendMode: 'ADD',
      follow: this.player,
    });

    this.flowGlow = glow;
    this.flowBurst = burst;
    this.flowEffects = [glow, burst];
  }

  createSecretPrompt(width, height) {
    this.secretPrompt = this.add.text(width - 120, height - 170, 'Secret Pipe\nPress Down', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#9be564',
      align: 'center',
      stroke: '#102a12',
      strokeThickness: 4,
    }).setOrigin(0.5);
    this.secretPrompt.setAlpha(0);
  }

  createSubjectPowerCourse(width, height) {
    this.lavaHazards = this.physics.add.staticGroup();
    this.photonOrbs = this.physics.add.staticGroup();

    if (this.topicId === 'volcanoes') {
      [240, 400, 560].forEach(x => {
        this.lavaHazards.create(x, height - 16, 'lava');
      });
      this.physics.add.overlap(this.player, this.lavaHazards, this.handleLavaHazard, null, this);
    }

    if (this.topicId === 'light-reflection') {
      [
        { x: width - 180, y: height - 220 },
        { x: width - 120, y: height - 280 },
        { x: width - 60, y: height - 220 },
      ].forEach(({ x, y }) => {
        const orb = this.photonOrbs.create(x, y, 'photon_orb');
        orb.setData('points', 5);
      });
      this.physics.add.overlap(this.player, this.photonOrbs, this.collectPhotonOrb, null, this);
    }
  }

  handleLavaHazard() {
    if (this.powerUpName !== 'Magma Suit' || this.subjectPowerUnlocked || this.isUiActive) {
      return;
    }

    this.subjectStreak = 0;
    this.player.setPosition(this.spawnPoint.x, this.spawnPoint.y);
    this.player.setVelocity(0, 0);
    this.player.setTint(0xff6b35);
    this.cameras.main.shake(180, 0.01);
    this.time.delayedCall(220, () => this.refreshPlayerTint());
    this.refreshPowerUpStatus();
  }

  collectPhotonOrb(player, orb) {
    orb.disableBody(true, true);
    this.score += orb.getData('points') ?? 5;
    this.scoreText.setText(`⭐ ${this.score}  Galileo ${this.galileoBadges}`);
  }

  startPhotonDash(isLeft, isRight, isUp, isDown) {
    const direction = new Phaser.Math.Vector2((isRight ? 1 : 0) - (isLeft ? 1 : 0), (isDown ? 1 : 0) - (isUp ? 1 : 0));
    if (direction.lengthSq() === 0) {
      direction.set(this.facing, 0);
    }
    direction.normalize();

    this.isDashing = true;
    this.canDash = false;
    this.player.body.allowGravity = false;
    this.player.setVelocity(direction.x * DASH_SPEED, direction.y * DASH_SPEED);
    this.refreshPlayerTint();
    this.refreshPowerUpStatus();

    this.time.delayedCall(DASH_DURATION, () => {
      this.isDashing = false;
      this.player.body.allowGravity = true;
      this.player.setVelocity(this.player.body.velocity.x * 0.35, this.player.body.velocity.y * 0.35);
      this.refreshPlayerTint();
    });

    this.time.delayedCall(DASH_COOLDOWN, () => {
      this.canDash = true;
      this.refreshPowerUpStatus();
    });
  }

  maybeUnlockSubjectPower() {
    if (this.subjectPowerUnlocked || !this.powerUpName) {
      return '';
    }

    const threshold = this.topicId === 'volcanoes' ? MAGMA_STREAK_THRESHOLD : this.topicId === 'light-reflection' ? PHOTON_STREAK_THRESHOLD : Infinity;
    if (this.subjectStreak < threshold) {
      return '';
    }

    this.subjectPowerUnlocked = true;
    this.refreshPlayerTint();
    this.refreshPowerUpStatus();

    if (this.topicId === 'volcanoes') {
      return 'Magma Suit unlocked! Lava is now safe.';
    }

    if (this.topicId === 'light-reflection') {
      return 'Photon Dash unlocked! Press Shift to dash.';
    }

    return '';
  }

  refreshPlayerTint() {
    if (this.isDashing) {
      this.player.setTint(0xfff27a);
      return;
    }
    if (this.topicId === 'volcanoes' && this.subjectPowerUnlocked) {
      this.player.setTint(0xff7a1a);
      return;
    }
    if (this.topicId === 'light-reflection' && this.subjectPowerUnlocked) {
      this.player.setTint(0xfff27a);
      return;
    }
    this.player.clearTint();
  }

  refreshPowerUpStatus() {
    if (!this.powerUpText) {
      return;
    }

    if (!this.powerUpName) {
      this.powerUpText.setText('Power-up unavailable');
      return;
    }

    if (this.topicId === 'volcanoes') {
      this.powerUpText.setText(this.subjectPowerUnlocked ? 'Magma Suit ready' : `Magma Suit ${this.subjectStreak}/${MAGMA_STREAK_THRESHOLD}`);
      return;
    }

    if (this.topicId === 'light-reflection') {
      if (!this.subjectPowerUnlocked) {
        this.powerUpText.setText(`Photon Dash ${this.subjectStreak}/${PHOTON_STREAK_THRESHOLD}`);
      } else if (this.canDash) {
        this.powerUpText.setText('Photon Dash ready');
      } else {
        this.powerUpText.setText('Photon Dash recharging');
      }
      return;
    }

    this.powerUpText.setText(`${this.powerUpName} locked`);
  }

  hitBlock(player, block) {
    if (player.body.touching.up && block.body.touching.down && block.getData('active') && !this.isUiActive) {
      block.setData('active', false);
      block.setTexture('block_hit');

      this.tweens.add({
        targets: block,
        y: block.y - 10,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          this.showQuestionUi(block.getData('questionIndex'), block);
        }
      });
    }
  }

  updateFlowState() {
    const shouldActivateFlow = this.perfectStreak >= FLOW_STREAK_THRESHOLD;

    this.comboText.setText(`Combo ${Math.min(this.perfectStreak, FLOW_STREAK_THRESHOLD)}/${FLOW_STREAK_THRESHOLD}`);

    if (shouldActivateFlow === this.isFlowStateActive) {
      return;
    }

    this.isFlowStateActive = shouldActivateFlow;

    if (this.isFlowStateActive) {
      this.flowGlow.setVisible(true);
      this.flowBurst.start();
      this.flowText.setAlpha(1);
      this.tweens.add({
        targets: this.flowText,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 500,
        yoyo: true,
        repeat: -1,
      });
      this.tweens.add({
        targets: this.flowGlow,
        alpha: 0.55,
        scaleX: 1.18,
        scaleY: 1.18,
        duration: 450,
        yoyo: true,
        repeat: -1,
      });
      return;
    }

    this.flowBurst.stop();
    this.flowGlow.setVisible(false);
    this.flowGlow.setAlpha(0.28);
    this.flowGlow.setScale(1);
    this.flowText.setAlpha(0);
    this.flowText.setScale(1);
    this.tweens.killTweensOf(this.flowGlow);
    this.tweens.killTweensOf(this.flowText);
  }

  update() {
    if (this.isUiActive) {
      this.player.setVelocityX(0);
      return;
    }

    const isLeft = this.cursors.left.isDown || this.keys.A.isDown;
    const isRight = this.cursors.right.isDown || this.keys.D.isDown;
    const isUp = this.cursors.up.isDown || this.cursors.space.isDown || this.keys.W.isDown;
    const isDown = this.cursors.down.isDown || this.keys.S.isDown;
    
    // Check for secret pipe entry
    const nearSecretPipe = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.secretPipe.x, this.secretPipe.y - 20) < 60;
    // Check for level exit
    const nearExit = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exitPipe.x, this.exitPipe.y - 20) < 60;

    if (this.flowGlow.visible) {
      this.flowGlow.setPosition(this.player.x, this.player.y);
    }

    if (this.isDashing) {
      return;
    }

    const moveSpeed = this.isFlowStateActive ? FLOW_MOVE_SPEED : BASE_MOVE_SPEED;
    const jumpSpeed = this.isFlowStateActive ? FLOW_JUMP_SPEED : BASE_JUMP_SPEED;

    if (isLeft) {
      this.player.setVelocityX(-moveSpeed);
      this.facing = -1;
    } else if (isRight) {
      this.player.setVelocityX(moveSpeed);
      this.facing = 1;
    } else {
      this.player.setVelocityX(0);
    }

    if (this.topicId === 'light-reflection' && this.subjectPowerUnlocked && this.canDash && Phaser.Input.Keyboard.JustDown(this.keys.SHIFT)) {
      this.startPhotonDash(isLeft, isRight, isUp, isDown);
    }

    if (nearSecretPipe && !this.secretZoneCleared) {
      this.secretPrompt.setAlpha(1);
      this.secretPromptVisible = true;
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.keys.S)) {
        this.showSecretQuestionUi();
      }
    } else if (this.secretPromptVisible) {
      this.secretPrompt.setAlpha(0);
      this.secretPromptVisible = false;
    }

    // Handle level exit pipe explicitly
    if (nearExit && this.currentQ >= this.totalQ) {
       // Reached exit after all questions
       if (Phaser.Input.Keyboard.JustDown(this.cursors.down) || Phaser.Input.Keyboard.JustDown(this.keys.S)) {
          this.endLevel();
       }
    }

    if (isUp && this.player.body.blocked.down) {
      this.player.setVelocityY(-jumpSpeed);
    }
  }

  showQuestionUi(index, block) {
    this.physics.pause();
    this.isUiActive = true;
    this.answered = false;
    this.currentActiveBlock = block;
    this.contentContainer.removeAll(true);
    const q = this.questions[index];
    const { width, height } = this.scale;

    const questionText = this.add.text(width / 2, 130, q.question, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width - 100 },
      lineSpacing: 8,
    }).setOrigin(0.5);
    this.contentContainer.add(questionText);

    const btnStartY = 220;
    const btnW = 400;
    const btnH = 50;
    const btnGap = 15;

    q.options.forEach((option, i) => {
      const btnY = btnStartY + i * (btnH + btnGap);
      this.createAnswerButton(width / 2, btnY, btnW, btnH, option, i, q);
    });

    this.tweens.add({ targets: this.uiContainer, alpha: 1, duration: 200 });
  }

  createAnswerButton(x, y, w, h, text, index, question) {
    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(0x2d2d5e, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    bg.lineStyle(2, 0x4a4a8a, 1);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      wordWrap: { width: w - 40 },
      align: 'center'
    }).setOrigin(0.5);

    container.add([bg, label]);
    this.contentContainer.add(container);

    const hitArea = this.add.rectangle(x, y, w, h, 0x000000, 0).setInteractive({ useHandCursor: true });
    this.contentContainer.add(hitArea);

    hitArea.on('pointerdown', () => {
      if (this.answered) return;
      this.answered = true;
      const isCorrect = index === question.correct;
      StateStore.recordAnswer(question.id, isCorrect);

      if (isCorrect) {
        this.score += 10;
        this.perfectStreak += 1;
        this.subjectStreak += 1;
        this.scoreText.setText(`⭐ ${this.score}  Galileo ${this.galileoBadges}`);
        this.updateFlowState();
        const unlockText = this.maybeUnlockSubjectPower();
        bg.clear();
        bg.fillStyle(0x27ae60, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

        const feedbackText = unlockText || (this.isFlowStateActive ? '✅ Correct! Flow State activated!' : '✅ Correct!');
        const feedback = this.add.text(this.scale.width / 2, y + h + 20, feedbackText, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '20px',
          fontStyle: 'bold',
          color: unlockText ? '#ffe082' : this.isFlowStateActive ? '#fff4a8' : '#2ecc71',
        }).setOrigin(0.5);
        this.contentContainer.add(feedback);
      } else {
        this.perfectStreak = 0;
        this.subjectStreak = 0;
        this.updateFlowState();
        this.refreshPowerUpStatus();
        bg.clear();
        bg.fillStyle(0xe74c3c, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

        const feedback = this.add.text(this.scale.width / 2, y + h + 20,
          `❌ Coaching: ${question.coaching_hint || question.explanation || 'Try again!'} The answer was: ${question.options[question.correct]}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#e74c3c',
          align: 'center',
          wordWrap: { width: this.scale.width - 60 },
        }).setOrigin(0.5);
        this.contentContainer.add(feedback);
      }

      this.time.delayedCall(isCorrect ? 1000 : 2500, () => {
        this.closeUiAndCheckLevelEnd(isCorrect);
      });
    });
  }

  showSecretQuestionUi() {
    this.physics.pause();
    this.isUiActive = true;
    this.answered = false;
    this.contentContainer.removeAll(true);
    const q = this.secretQuestions[this.secretQuestionIndex % this.secretQuestions.length];
    const { width } = this.scale;

    const title = this.add.text(width / 2, 95, 'Secret Assessment Zone', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#9be564',
    }).setOrigin(0.5);
    this.contentContainer.add(title);

    const subtitle = this.add.text(width / 2, 130, 'Hardcore challenge for a Galileo Badge.', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#d9f7be',
    }).setOrigin(0.5);
    this.contentContainer.add(subtitle);

    const questionText = this.add.text(width / 2, 185, q.question, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width - 100 },
      lineSpacing: 8,
    }).setOrigin(0.5);
    this.contentContainer.add(questionText);

    const btnStartY = 275;
    const btnW = 400;
    const btnH = 50;
    const btnGap = 15;

    q.options.forEach((option, i) => {
      const btnY = btnStartY + i * (btnH + btnGap);
      this.createSecretAnswerButton(width / 2, btnY, btnW, btnH, option, i, q);
    });

    this.tweens.add({ targets: this.uiContainer, alpha: 1, duration: 200 });
  }

  createSecretAnswerButton(x, y, w, h, text, index, question) {
    const container = this.add.container(x, y);
    const bg = this.add.graphics();
    bg.fillStyle(0x204020, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    bg.lineStyle(2, 0x9be564, 1);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff',
      wordWrap: { width: w - 40 },
      align: 'center'
    }).setOrigin(0.5);

    container.add([bg, label]);
    this.contentContainer.add(container);

    const hitArea = this.add.rectangle(x, y, w, h, 0x000000, 0).setInteractive({ useHandCursor: true });
    this.contentContainer.add(hitArea);

    hitArea.on('pointerdown', () => {
      if (this.answered) return;
      this.answered = true;
      const isCorrect = index === question.correct;
      StateStore.recordAnswer(question.id, isCorrect);

      bg.clear();
      bg.fillStyle(isCorrect ? 0x27ae60 : 0xe74c3c, 1);
      bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

      if (isCorrect) {
        this.galileoBadges += 1;
        this.secretZoneCleared = true;
        this.score += SECRET_ZONE_BONUS;
        this.scoreText.setText(`⭐ ${this.score}  Galileo ${this.galileoBadges}`);
        this.secretPrompt.setText('Secret Zone Cleared');
        this.secretPrompt.setAlpha(1);
      }

      const feedback = this.add.text(this.scale.width / 2, y + h + 24,
        isCorrect ? '🏅 Galileo Badge unlocked!' : `❌ The answer is: ${question.options[question.correct]}`,
        {
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          fontStyle: 'bold',
          color: isCorrect ? '#9be564' : '#e74c3c',
          align: 'center',
          wordWrap: { width: this.scale.width - 60 },
        }).setOrigin(0.5);
      this.contentContainer.add(feedback);

      this.secretQuestionIndex += 1;
      this.time.delayedCall(isCorrect ? 1200 : 1800, () => {
        this.tweens.add({
          targets: this.uiContainer,
          alpha: 0,
          duration: 200,
          onComplete: () => {
            this.isUiActive = false;
            this.physics.resume();
          }
        });
      });
    });
  }

  closeUiAndCheckLevelEnd(isCorrect) {
    this.tweens.add({
      targets: this.uiContainer,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.isUiActive = false;
        this.physics.resume();
        
        if (isCorrect) {
          this.currentQ++;
          if (this.currentActiveBlock) {
             const wall = this.currentActiveBlock.getData('wall');
             if (wall) wall.destroy();
          }
        } else {
          // If failed, restore the block for another try. It acts as a gate.
          if (this.currentActiveBlock) {
            this.currentActiveBlock.setData('active', true);
            this.currentActiveBlock.setTexture('qblock');
          }
        }
      }
    });
  }

  endLevel() {
    this.scene.start('BossScene', {
      score: this.score,
      total: this.totalQ,
      topicName: this.topicName,
      topicEmoji: this.topicEmoji,
      topicColor: this.topicColor,
      topicIndex: this.topicIndex,
      galileoBadges: this.galileoBadges,
      flowState: this.isFlowStateActive,
      powerUpName: this.subjectPowerUnlocked ? this.powerUpName : null,
      secretZoneCleared: this.secretZoneCleared,
    });
  }
}
