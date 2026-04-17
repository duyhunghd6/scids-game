import * as Phaser from 'phaser';

export class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' });
  }

  init(data) {
    this.score = data.score ?? 0;
    this.total = data.total ?? 1;
    this.topicName = data.topicName ?? 'Quiz';
    this.topicEmoji = data.topicEmoji ?? '🧪';
    this.topicColor = data.topicColor ?? 0xe94560;
    this.topicIndex = data.topicIndex ?? 0;
    this.bossHits = data.bossHits ?? 0;
    this.bossTotal = data.bossTotal ?? 0;
    this.bossWon = data.bossWon ?? false;
    this.earnedCoins = Math.max(1, Math.round(this.score / 10));
  }

  create() {
    const { width, height } = this.scale;
    const percentage = Math.round((this.score / (this.total * 10)) * 100);
    const currentCoins = this.registry.get('hubCoins') ?? 0;
    this.registry.set('hubCoins', currentCoins + this.earnedCoins);

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x16213e, 0x0f3460, 0x533483, 1);
    bg.fillRect(0, 0, width, height);

    // Stars rating
    const stars = percentage >= 80 ? 3 : percentage >= 50 ? 2 : 1;
    const starEmoji = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    // Celebration particles for high scores
    if (percentage >= 70) {
      this.createCelebration(width, height);
    }

    // Result card
    const cardW = 360;
    const cardH = 320;
    const cardX = width / 2;
    const cardY = height / 2 - 10;

    const card = this.add.graphics();
    card.fillStyle(0x2d2d5e, 0.9);
    card.fillRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);
    card.lineStyle(3, this.topicColor, 0.8);
    card.strokeRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 20);

    // Topic badge
    this.add.text(cardX, cardY - 130, `${this.topicEmoji} ${this.topicName}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Big result text
    let resultMessage, resultColor;
    if (percentage >= 80) {
      resultMessage = '🎉 Amazing!';
      resultColor = '#2ecc71';
    } else if (percentage >= 50) {
      resultMessage = '👍 Good Job!';
      resultColor = '#f39c12';
    } else {
      resultMessage = '💪 Keep Trying!';
      resultColor = '#e94560';
    }

    const resultText = this.add.text(cardX, cardY - 80, resultMessage, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      fontStyle: 'bold',
      color: resultColor,
    }).setOrigin(0.5).setScale(0);

    this.tweens.add({
      targets: resultText,
      scaleX: 1, scaleY: 1,
      duration: 500,
      ease: 'Back.easeOut',
      delay: 300,
    });

    // Stars
    this.add.text(cardX, cardY - 40, starEmoji, {
      fontSize: '36px',
    }).setOrigin(0.5);

    // Score
    this.add.text(cardX, cardY + 10, `Score: ${this.score} / ${this.total * 10}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Percentage
    this.add.text(cardX, cardY + 40, `${percentage}%`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    // Correct / Total questions
    this.add.text(cardX, cardY + 65, `${this.score / 10} of ${this.total} correct`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#cccccc',
    }).setOrigin(0.5);

    this.add.text(cardX, cardY + 90, `Coins earned: +${this.earnedCoins}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#ffd700',
    }).setOrigin(0.5);

    if (this.bossTotal > 0) {
      const bossLabel = this.bossWon ? 'Boss defeated' : 'Boss survived';
      const bossColor = this.bossWon ? '#4ade80' : '#fca5a5';
      this.add.text(cardX, cardY + 112, `${bossLabel} · ${this.bossHits}/${this.bossTotal} hits`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
        color: bossColor,
      }).setOrigin(0.5);
    }

    // Buttons
    this.createButton(cardX - 85, cardY + 145, 150, 40, '🔄 Try Again', 0xe94560, () => {
      this.scene.start('QuizScene', { topicIndex: this.topicIndex });
    });

    this.createButton(cardX + 85, cardY + 145, 150, 40, '📚 Topics', 0x3498db, () => {
      this.scene.start('MenuScene');
    });
  }

  createButton(x, y, w, h, text, color, callback) {
    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(color);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 20);

    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    container.add([bg, label]);

    const hitArea = this.add.rectangle(x, y, w, h, 0x000000, 0).setInteractive({ useHandCursor: true });
    hitArea.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.08, scaleY: 1.08, duration: 150 });
    });
    hitArea.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 150 });
    });
    hitArea.on('pointerdown', () => {
      this.tweens.add({
        targets: container, scaleX: 0.95, scaleY: 0.95, duration: 80, yoyo: true,
        onComplete: callback,
      });
    });

    // Entrance
    container.setScale(0);
    this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 400, delay: 600, ease: 'Back.easeOut' });
  }

  createCelebration(width, height) {
    const colors = [0xffd700, 0xe94560, 0x2ecc71, 0x3498db, 0x9b59b6, 0xf39c12];
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(50, width - 50);
      const y = -Phaser.Math.Between(20, 100);
      const size = Phaser.Math.Between(4, 10);
      const color = Phaser.Utils.Array.GetRandom(colors);
      const confetti = this.add.graphics();
      confetti.fillStyle(color);
      confetti.fillRect(-size / 2, -size / 2, size, size);
      confetti.setPosition(x, y);

      this.tweens.add({
        targets: confetti,
        y: height + 50,
        x: x + Phaser.Math.Between(-80, 80),
        angle: Phaser.Math.Between(-720, 720),
        duration: Phaser.Math.Between(2000, 4000),
        delay: Phaser.Math.Between(0, 1500),
        ease: 'Quad.easeIn',
        onComplete: () => confetti.destroy(),
      });
    }
  }
}
