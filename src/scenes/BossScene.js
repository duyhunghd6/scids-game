import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';

const ARENA_HEIGHT = 520;
const TIMER_SECONDS = 25;

const BOSS_CONFIG = {
  default: {
    title: 'Knowledge Boss Arena',
    bossName: 'Chaos Cloud',
    prompt: 'Drag the correct answer shards into the beam to weaken the boss.',
    laneColor: 0x74b9ff,
    bossColor: 0x6c5ce7,
    accentColor: 0xffffff,
  },
  'light-reflection': {
    title: 'Light Boss Arena',
    bossName: 'Darkness Monster',
    prompt: 'Drag reflective science shards into the beam before darkness wins.',
    laneColor: 0xf1c40f,
    bossColor: 0x2d3436,
    accentColor: 0xfff176,
  },
  'electrical-circuits': {
    title: 'Circuit Boss Arena',
    bossName: 'Short Circuit Ogre',
    prompt: 'Power the beam with correct circuit answers before the overload spreads.',
    laneColor: 0xf39c12,
    bossColor: 0x2c3e50,
    accentColor: 0xfad961,
  },
  volcanoes: {
    title: 'Volcano Boss Arena',
    bossName: 'Magma Beast',
    prompt: 'Launch the right volcano answers to cool the magma core.',
    laneColor: 0xe67e22,
    bossColor: 0xc0392b,
    accentColor: 0xffbe76,
  },
};

export class BossScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BossScene' });
  }

  init(data) {
    this.baseScore = data.score ?? 0;
    this.total = data.total ?? 1;
    this.topicName = data.topicName ?? 'Quiz';
    this.topicEmoji = data.topicEmoji ?? '🧪';
    this.topicColor = data.topicColor ?? 0xe94560;
    this.topicIndex = data.topicIndex ?? 0;
    this.bossScore = 0;
    this.bossHits = 0;
    this.maxBossHits = 3;
    this.bossResolved = false;
    this.galileoBadges = data.galileoBadges ?? 0;
    this.flowState = data.flowState ?? false;
    this.powerUpName = data.powerUpName ?? null;
    this.secretZoneCleared = data.secretZoneCleared ?? false;

    const topic = this.topicIndex >= 0 ? TOPICS[this.topicIndex] : null;
    this.topicId = topic?.id ?? 'default';
    this.bossConfig = BOSS_CONFIG[this.topicId] ?? BOSS_CONFIG.default;

    const sourceQuestions = topic?.questions ?? TOPICS.flatMap((entry) => entry.questions);
    this.challengeQuestions = Phaser.Utils.Array.Shuffle([...sourceQuestions]).slice(0, this.maxBossHits);
    this.currentChallengeIndex = 0;
  }

  create() {
    const { width, height } = this.scale;

    this.createBackground(width, height);
    this.createHeader(width);
    this.createArenaFrame(width, height);
    this.createBoss(width);
    this.createDropZone(width, height);
    this.createStatus(width, height);
    this.registerDragHandlers();
    this.showChallenge();
  }

  createBackground(width, height) {
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x0f172a, 0x0f172a, 0x1e293b, 0x111827, 1);
    bg.fillRect(0, 0, width, height);

    for (let i = 0; i < 40; i++) {
      const star = this.add.circle(
        Phaser.Math.Between(20, width - 20),
        Phaser.Math.Between(20, height - 20),
        Phaser.Math.Between(1, 3),
        0xffffff,
        Phaser.Math.FloatBetween(0.25, 0.8)
      );

      this.tweens.add({
        targets: star,
        alpha: Phaser.Math.FloatBetween(0.15, 0.9),
        duration: Phaser.Math.Between(600, 1500),
        yoyo: true,
        repeat: -1,
      });
    }
  }

  createHeader(width) {
    const header = this.add.graphics();
    header.fillStyle(this.topicColor, 0.9);
    header.fillRect(0, 0, width, 54);

    this.add.text(20, 27, `${this.topicEmoji} ${this.bossConfig.title}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0, 0.5);

    this.scoreText = this.add.text(width - 20, 27, `Score ${this.baseScore + this.bossScore}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(1, 0.5);
  }

  createArenaFrame(width, height) {
    const frame = this.add.graphics();
    frame.fillStyle(0x111827, 0.65);
    frame.fillRoundedRect(24, 74, width - 48, height - 104, 24);
    frame.lineStyle(3, this.topicColor, 0.7);
    frame.strokeRoundedRect(24, 74, width - 48, height - 104, 24);

    this.add.text(width / 2, 104, this.bossConfig.prompt, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#e5e7eb',
      align: 'center',
      wordWrap: { width: width - 120 },
    }).setOrigin(0.5, 0);
  }

  createBoss(width) {
    this.bossContainer = this.add.container(width / 2, 220);

    const aura = this.add.circle(0, 0, 92, this.bossConfig.accentColor, 0.12);
    const body = this.add.circle(0, 0, 62, this.bossConfig.bossColor, 1);
    const eyeLeft = this.add.circle(-20, -10, 8, 0xffffff, 1);
    const eyeRight = this.add.circle(20, -10, 8, 0xffffff, 1);
    const pupilLeft = this.add.circle(-20, -10, 3, 0x111111, 1);
    const pupilRight = this.add.circle(20, -10, 3, 0x111111, 1);
    const mouth = this.add.rectangle(0, 22, 34, 10, 0xffffff, 0.9);

    this.bossContainer.add([aura, body, eyeLeft, eyeRight, pupilLeft, pupilRight, mouth]);

    this.bossNameText = this.add.text(width / 2, 306, this.bossConfig.bossName, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.bossHealthBg = this.add.rectangle(width / 2, 338, 320, 16, 0x334155, 1).setOrigin(0.5);
    this.bossHealthFill = this.add.rectangle(width / 2 - 160, 338, 320, 16, 0xef4444, 1).setOrigin(0, 0.5);

    this.tweens.add({
      targets: this.bossContainer,
      y: 228,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  createDropZone(width, height) {
    this.dropZone = this.add.zone(width / 2, 398, width - 160, 92).setRectangleDropZone(width - 160, 92);

    this.dropZoneBg = this.add.graphics();
    this.drawDropZone(this.topicColor, 0.28);

    this.dropZoneLabel = this.add.text(width / 2, 398, 'Drop correct answer here', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.beam = this.add.graphics();
    this.beam.fillStyle(this.bossConfig.laneColor, 0.18);
    this.beam.fillRect(width / 2 - 18, 350, 36, 70);
  }

  drawDropZone(color, alpha) {
    const { width } = this.scale;
    this.dropZoneBg.clear();
    this.dropZoneBg.fillStyle(color, alpha);
    this.dropZoneBg.fillRoundedRect(80, 352, width - 160, 92, 20);
    this.dropZoneBg.lineStyle(3, color, 1);
    this.dropZoneBg.strokeRoundedRect(80, 352, width - 160, 92, 20);
  }

  createStatus(width, height) {
    this.challengeText = this.add.text(width / 2, 458, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width - 80 },
      lineSpacing: 6,
    }).setOrigin(0.5, 0);

    this.feedbackText = this.add.text(width / 2, height - 78, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#93c5fd',
      align: 'center',
      wordWrap: { width: width - 100 },
    }).setOrigin(0.5);

    this.timerText = this.add.text(32, height - 42, `Time ${TIMER_SECONDS}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#f8fafc',
    }).setOrigin(0, 0.5);

    this.progressText = this.add.text(width - 32, height - 42, `Boss hits ${this.bossHits}/${this.maxBossHits}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#f8fafc',
    }).setOrigin(1, 0.5);

    this.timeLeft = TIMER_SECONDS;
    this.bossTimer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.bossResolved) {
          return;
        }

        this.timeLeft -= 1;
        this.timerText.setText(`Time ${this.timeLeft}`);

        if (this.timeLeft <= 5) {
          this.timerText.setColor('#f87171');
        }

        if (this.timeLeft <= 0) {
          this.finishBossFight(false);
        }
      },
    });
  }

  registerDragHandlers() {
    this.input.dragDistanceThreshold = 8;

    this.input.on('dragstart', (pointer, gameObject) => {
      if (this.bossResolved) {
        return;
      }

      gameObject.setDepth(10);
      gameObject.input.cursor = 'grabbing';
      this.tweens.add({ targets: gameObject, scaleX: 1.06, scaleY: 1.06, duration: 120 });
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      if (this.bossResolved) {
        return;
      }

      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragenter', () => {
      if (this.bossResolved) {
        return;
      }

      this.drawDropZone(this.bossConfig.laneColor, 0.5);
    });

    this.input.on('dragleave', () => {
      if (this.bossResolved) {
        return;
      }

      this.drawDropZone(this.topicColor, 0.28);
    });

    this.input.on('drop', (pointer, gameObject) => {
      if (this.bossResolved) {
        return;
      }

      this.handleDrop(gameObject);
    });

    this.input.on('dragend', (pointer, gameObject, dropped) => {
      gameObject.setDepth(1);
      gameObject.input.cursor = 'grab';
      this.tweens.add({ targets: gameObject, scaleX: 1, scaleY: 1, duration: 120 });

      if (!dropped && !this.bossResolved) {
        this.resetShardPosition(gameObject);
      }
    });
  }

  showChallenge() {
    this.feedbackText.setText('');
    this.drawDropZone(this.topicColor, 0.28);

    if (this.currentChallengeIndex >= this.challengeQuestions.length) {
      this.finishBossFight(true);
      return;
    }

    const challenge = this.challengeQuestions[this.currentChallengeIndex];
    this.activeChallenge = challenge;
    this.challengeText.setText(challenge.question);

    this.answerContainer?.destroy(true);
    this.answerContainer = this.add.container(0, 0);
    this.answerShards = [];

    const optionY = 552;
    const optionWidth = 170;
    const optionHeight = 56;
    const gap = 16;
    const totalWidth = (optionWidth * challenge.options.length) + (gap * (challenge.options.length - 1));
    const startX = (this.scale.width - totalWidth) / 2 + optionWidth / 2;

    challenge.options.forEach((option, index) => {
      const x = startX + (index * (optionWidth + gap));
      const shard = this.createAnswerShard(x, optionY, optionWidth, optionHeight, option, index === challenge.correct);
      this.answerContainer.add(shard.container);
      this.answerShards.push(shard.container);
    });
  }

  createAnswerShard(x, y, width, height, label, isCorrect) {
    const container = this.add.container(x, y);
    const bg = this.add.graphics();
    bg.fillStyle(0x1f2937, 0.96);
    bg.fillRoundedRect(-width / 2, -height / 2, width, height, 16);
    bg.lineStyle(2, isCorrect ? this.bossConfig.laneColor : 0x64748b, 1);
    bg.strokeRoundedRect(-width / 2, -height / 2, width, height, 16);

    const text = this.add.text(0, 0, label, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#f8fafc',
      align: 'center',
      wordWrap: { width: width - 18 },
    }).setOrigin(0.5);

    container.add([bg, text]);
    container.setSize(width, height);
    container.setData('homeX', x);
    container.setData('homeY', y);
    container.setData('isCorrect', isCorrect);
    container.setInteractive(new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height), Phaser.Geom.Rectangle.Contains, {
      useHandCursor: true,
      draggable: true,
      cursor: 'grab',
    });
    this.input.setDraggable(container);

    return { container, bg, text };
  }

  handleDrop(gameObject) {
    if (gameObject.getData('isCorrect')) {
      this.bossHits += 1;
      this.bossScore += 10;
      this.scoreText.setText(`Score ${this.baseScore + this.bossScore}`);
      this.progressText.setText(`Boss hits ${this.bossHits}/${this.maxBossHits}`);
      this.feedbackText.setColor('#4ade80');
      this.feedbackText.setText('Direct hit! The boss is losing power.');
      this.damageBoss();
      this.currentChallengeIndex += 1;

      this.time.delayedCall(500, () => this.showChallenge());
    } else {
      this.feedbackText.setColor('#f87171');
      this.feedbackText.setText(`Wrong shard. Hint: ${this.activeChallenge.hint}`);
      this.timeLeft = Math.max(0, this.timeLeft - 3);
      this.timerText.setText(`Time ${this.timeLeft}`);
      if (this.timeLeft <= 5) {
        this.timerText.setColor('#f87171');
      }
      this.resetShardPosition(gameObject);

      if (this.timeLeft <= 0) {
        this.finishBossFight(false);
      }
    }
  }

  resetShardPosition(gameObject) {
    this.tweens.add({
      targets: gameObject,
      x: gameObject.getData('homeX'),
      y: gameObject.getData('homeY'),
      duration: 180,
      ease: 'Quad.easeOut',
    });
  }

  damageBoss() {
    const remainingRatio = 1 - (this.bossHits / this.maxBossHits);
    this.bossHealthFill.width = 320 * Math.max(remainingRatio, 0);

    this.tweens.add({
      targets: this.bossContainer,
      x: this.scale.width / 2 + 18,
      duration: 50,
      yoyo: true,
      repeat: 3,
    });

    this.tweens.add({
      targets: this.bossContainer,
      scaleX: 0.85,
      scaleY: 0.85,
      alpha: 0.7,
      duration: 120,
      yoyo: true,
    });
  }

  finishBossFight(won) {
    if (this.bossResolved) {
      return;
    }

    this.bossResolved = true;
    this.input.off('dragstart');
    this.input.off('drag');
    this.input.off('dragenter');
    this.input.off('dragleave');
    this.input.off('drop');
    this.input.off('dragend');
    this.bossTimer?.remove(false);

    const finalScore = this.baseScore + this.bossScore;
    const bonusTotal = this.total + this.maxBossHits;

    if (won) {
      this.feedbackText.setColor('#fde047');
      this.feedbackText.setText('Boss defeated! The exit portal opens.');
      this.createVictoryBurst();
    } else {
      this.feedbackText.setColor('#fca5a5');
      this.feedbackText.setText('The boss held on. You still escape with what you learned.');
      this.challengeText.setText('The arena collapses as the boss fades back into the shadows.');
    }

    this.time.delayedCall(1400, () => {
      this.scene.start('ResultScene', {
        score: finalScore,
        total: bonusTotal,
        topicName: this.topicName,
        topicEmoji: this.topicEmoji,
        topicColor: this.topicColor,
        topicIndex: this.topicIndex,
        bossHits: this.bossHits,
        bossTotal: this.maxBossHits,
        bossWon: won,
        galileoBadges: this.galileoBadges,
        flowState: this.flowState,
        powerUpName: this.powerUpName,
        secretZoneCleared: this.secretZoneCleared,
      });
    });
  }

  createVictoryBurst() {
    for (let i = 0; i < 16; i++) {
      const orb = this.add.circle(this.scale.width / 2, 220, Phaser.Math.Between(4, 8), this.bossConfig.laneColor, 0.95);
      const angle = Phaser.Math.DegToRad((360 / 16) * i);
      const distance = Phaser.Math.Between(100, 180);

      this.tweens.add({
        targets: orb,
        x: orb.x + Math.cos(angle) * distance,
        y: orb.y + Math.sin(angle) * distance,
        alpha: 0,
        duration: 650,
        ease: 'Cubic.easeOut',
        onComplete: () => orb.destroy(),
      });
    }
  }
}
