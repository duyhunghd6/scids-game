import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';

const TILE_SIZE = 64;

export class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizScene' });
  }

  init(data) {
    this.topicIndex = data.topicIndex ?? 0;
    this.score = 0;
    this.currentQ = 0;
    this.answered = false;

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
    } else {
      const topic = TOPICS[this.topicIndex];
      this.questions = Phaser.Utils.Array.Shuffle([...topic.questions]);
      this.topicName = topic.name;
      this.topicColor = topic.color;
      this.topicEmoji = topic.emoji;
    }
    this.totalQ = this.questions.length;
  }

  create() {
    const { width, height } = this.scale;

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x0f3460, 0x0f3460, 1);
    bg.fillRect(0, 0, width, height);

    this.createLevelTilemap();

    this.player = this.physics.add.sprite(50, height - 100, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.add.collider(this.player, this.groundLayer);

    this.questionBlocks = this.physics.add.staticGroup();

    const startX = 150;
    const spacing = (width - 200) / Math.max(1, this.totalQ - 1);

    this.questions.forEach((q, i) => {
      const bx = startX + (i * spacing);
      const by = height - 150 - (i % 2 === 0 ? 0 : 50);
      const block = this.questionBlocks.create(bx, by, 'qblock');
      block.setData('questionIndex', i);
      block.setData('active', true);
    });

    this.physics.add.collider(this.player, this.questionBlocks, this.hitBlock, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');

    this.createTopBar(width);

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
    const data = Array.from({ length: rows }, (_, row) => (
      Array.from({ length: columns }, () => (row === rows - 1 ? 1 : -1))
    ));

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

    this.scoreText = this.add.text(width - 15, 20, `⭐ ${this.score}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffd700',
    }).setOrigin(1, 0.5);

    const backBtn = this.add.text(width / 2, 20, 'Exit Level', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff88',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
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
          this.showQuestionUi(block.getData('questionIndex'));
        }
      });
    }
  }

  update() {
    if (this.isUiActive) {
      this.player.setVelocityX(0);
      return;
    }

    const isLeft = this.cursors.left.isDown || this.keys.A.isDown;
    const isRight = this.cursors.right.isDown || this.keys.D.isDown;
    const isUp = this.cursors.up.isDown || this.cursors.space.isDown || this.keys.W.isDown;

    if (isLeft) {
      this.player.setVelocityX(-200);
    } else if (isRight) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (isUp && this.player.body.blocked.down) {
      this.player.setVelocityY(-450);
    }
  }

  showQuestionUi(index) {
    this.isUiActive = true;
    this.answered = false;
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

      if (isCorrect) {
        this.score += 10;
        this.scoreText.setText(`⭐ ${this.score}`);
        bg.clear();
        bg.fillStyle(0x27ae60, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

        const feedback = this.add.text(this.scale.width / 2, y + h + 20, '✅ Correct!', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '20px',
          fontStyle: 'bold',
          color: '#2ecc71',
        }).setOrigin(0.5);
        this.contentContainer.add(feedback);
      } else {
        bg.clear();
        bg.fillStyle(0xe74c3c, 1);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

        const feedback = this.add.text(this.scale.width / 2, y + h + 20,
          `❌ The answer is: ${question.options[question.correct]}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#e74c3c',
          align: 'center',
          wordWrap: { width: this.scale.width - 60 },
        }).setOrigin(0.5);
        this.contentContainer.add(feedback);
      }

      this.time.delayedCall(isCorrect ? 1000 : 2000, () => {
        this.closeUiAndCheckLevelEnd();
      });
    });
  }

  closeUiAndCheckLevelEnd() {
    this.tweens.add({
      targets: this.uiContainer,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.isUiActive = false;
        this.currentQ++;
        if (this.currentQ >= this.totalQ) {
          this.scene.start('ResultScene', {
            score: this.score,
            total: this.totalQ,
            topicName: this.topicName,
            topicEmoji: this.topicEmoji,
            topicColor: this.topicColor,
            topicIndex: this.topicIndex,
          });
        }
      }
    });
  }
}
