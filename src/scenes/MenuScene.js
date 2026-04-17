import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x5C94FC, 0x5C94FC, 0x1a1a2e, 0x1a1a2e, 1);
    bg.fillRect(0, 0, width, height);

    // Title
    this.add.text(width / 2, 80, '🧪 Science Lab Hub World', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '36px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.add.text(width / 2, 120, 'Use Arrows/WASD to move, Space to jump. Hit a block to start!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#dddddd',
    }).setOrigin(0.5);

    // Create ground
    this.platforms = this.physics.add.staticGroup();
    for (let x = 0; x < width; x += 64) {
      this.platforms.create(x + 32, height - 32, 'ground');
    }

    // Create player
    this.player = this.physics.add.sprite(100, height - 100, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    // Create topic blocks
    this.topicBlocks = this.physics.add.staticGroup();
    const startX = 200;
    const spacing = (width - 300) / Math.max(1, TOPICS.length - 1);

    TOPICS.forEach((topic, i) => {
      const bx = startX + (i * spacing);
      const by = height - 180;
      const block = this.topicBlocks.create(bx, by, 'qblock');
      block.setData('topicIndex', i);

      // Topic label
      this.add.text(bx, by - 40, `${topic.emoji}\n${topic.name}`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      }).setOrigin(0.5);
    });

    // Handle jumping into blocks
    this.physics.add.collider(this.player, this.topicBlocks, this.hitBlock, null, this);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
  }

  hitBlock(player, block) {
    if (player.body.touching.up && block.body.touching.down) {
      const topicIndex = block.getData('topicIndex');
      
      // Small bounce effect on block
      this.tweens.add({
        targets: block,
        y: block.y - 10,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          this.scene.start('QuizScene', { topicIndex });
        }
      });
    }
  }

  update() {
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

    if (isUp && this.player.body.touching.down) {
      this.player.setVelocityY(-450);
    }
  }
}
