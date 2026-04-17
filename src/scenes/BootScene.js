import * as Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Fun gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x16213e, 0x0f3460, 0x533483, 1);
    bg.fillRect(0, 0, width, height);

    // Game title with bounce-in
    const title = this.add.text(width / 2, height / 2 - 40, '🧪 SciDS', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '64px',
      fontStyle: 'bold',
      color: '#e94560',
      stroke: '#ffffff',
      strokeThickness: 4,
    }).setOrigin(0.5).setScale(0);

    const subtitle = this.add.text(width / 2, height / 2 + 30, 'Science Discovery Game', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      alpha: 0,
    }).setOrigin(0.5);

    const loadingText = this.add.text(width / 2, height / 2 + 70, 'Loading...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#aaaaaa',
      alpha: 0,
    }).setOrigin(0.5);

    // Animate title
    this.tweens.add({
      targets: title,
      scaleX: 1,
      scaleY: 1,
      duration: 600,
      ease: 'Back.easeOut',
    });

    this.tweens.add({
      targets: subtitle,
      alpha: 1,
      duration: 400,
      delay: 400,
    });

    this.tweens.add({
      targets: loadingText,
      alpha: 1,
      duration: 300,
      delay: 600,
    });

    // Switch to preload after a moment
    this.time.delayedCall(1200, () => {
      this.scene.start('PreloadScene');
    });
  }
}
