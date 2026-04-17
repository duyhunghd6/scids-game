import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Background gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x0f3460, 0x16213e, 0x1a1a2e, 0x533483, 1);
    bg.fillRect(0, 0, width, height);

    // Floating particles for ambiance
    this.createFloatingParticles(width, height);

    // Title
    const title = this.add.text(width / 2, 45, '🧪 SciDS', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#e94560',
      stroke: '#ffffff',
      strokeThickness: 3,
    }).setOrigin(0.5);

    const subtitle = this.add.text(width / 2, 75, 'Choose a topic to explore!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#cccccc',
    }).setOrigin(0.5);

    // Topic grid – 4 columns x 3 rows
    const cols = 4;
    const cardW = 160;
    const cardH = 110;
    const gapX = 15;
    const gapY = 12;
    const gridW = cols * cardW + (cols - 1) * gapX;
    const startX = (width - gridW) / 2 + cardW / 2;
    const startY = 150;

    TOPICS.forEach((topic, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);
      this.createTopicCard(x, y, cardW, cardH, topic, i);
    });

    // Play All button at the bottom
    this.createPlayAllButton(width / 2, height - 40);
  }

  createFloatingParticles(width, height) {
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const size = Phaser.Math.Between(2, 5);
      const alpha = Phaser.Math.FloatBetween(0.1, 0.4);
      const dot = this.add.graphics();
      dot.fillStyle(0xffffff, alpha);
      dot.fillCircle(0, 0, size);
      dot.setPosition(x, y);
      this.tweens.add({
        targets: dot,
        y: y - Phaser.Math.Between(20, 60),
        alpha: 0,
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        yoyo: true,
        ease: 'Sine.easeInOut',
      });
    }
  }

  createTopicCard(x, y, w, h, topic, index) {
    const container = this.add.container(x, y);

    // Card background
    const card = this.add.graphics();
    card.fillStyle(topic.color, 0.85);
    card.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    card.lineStyle(2, 0xffffff, 0.3);
    card.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    // Emoji icon
    const emoji = this.add.text(0, -18, topic.emoji, {
      fontSize: '30px',
    }).setOrigin(0.5);

    // Topic name
    const name = this.add.text(0, 16, topic.name, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: w - 20 },
    }).setOrigin(0.5);

    // Question count
    const count = this.add.text(0, 38, `${topic.questions.length} Q`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px',
      color: '#ffffffaa',
    }).setOrigin(0.5);

    container.add([card, emoji, name, count]);

    // Interactive hit area
    const hitArea = this.add.rectangle(x, y, w, h, 0x000000, 0).setInteractive({ useHandCursor: true });

    // Hover effects
    hitArea.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.05, scaleY: 1.05, duration: 150 });
    });
    hitArea.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 150 });
    });
    hitArea.on('pointerdown', () => {
      this.tweens.add({
        targets: container,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 80,
        yoyo: true,
        onComplete: () => {
          this.scene.start('QuizScene', { topicIndex: index });
        }
      });
    });

    // Entrance animation
    container.setScale(0);
    this.tweens.add({
      targets: container,
      scaleX: 1,
      scaleY: 1,
      duration: 400,
      delay: index * 60,
      ease: 'Back.easeOut',
    });
  }

  createPlayAllButton(x, y) {
    const btnW = 200;
    const btnH = 36;
    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(0xe94560);
    bg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 18);

    const label = this.add.text(0, 0, '🚀 Play All Topics!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    container.add([bg, label]);

    const hitArea = this.add.rectangle(x, y, btnW, btnH, 0x000000, 0).setInteractive({ useHandCursor: true });
    hitArea.on('pointerover', () => {
      this.tweens.add({ targets: container, scaleX: 1.08, scaleY: 1.08, duration: 150 });
    });
    hitArea.on('pointerout', () => {
      this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 150 });
    });
    hitArea.on('pointerdown', () => {
      this.scene.start('QuizScene', { topicIndex: -1 }); // -1 = all topics
    });

    // Entrance anim
    container.setAlpha(0);
    this.tweens.add({ targets: container, alpha: 1, duration: 500, delay: 800 });
  }
}
