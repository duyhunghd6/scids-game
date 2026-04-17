import * as Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x16213e, 0x0f3460, 0x533483, 1);
    bg.fillRect(0, 0, width, height);

    // Progress bar background
    const barWidth = 400;
    const barHeight = 20;
    const barX = (width - barWidth) / 2;
    const barY = height / 2 + 20;

    const barBg = this.add.graphics();
    barBg.fillStyle(0x333333);
    barBg.fillRoundedRect(barX, barY, barWidth, barHeight, 10);

    const barFill = this.add.graphics();

    const loadText = this.add.text(width / 2, barY - 30, 'Getting ready...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const percentText = this.add.text(width / 2, barY + barHeight + 15, '0%', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#aaaaaa',
    }).setOrigin(0.5);

    // Simulate loading progress with tween (no heavy assets to load)
    let progress = { value: 0 };
    this.tweens.add({
      targets: progress,
      value: 1,
      duration: 800,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        barFill.clear();
        barFill.fillStyle(0xe94560);
        barFill.fillRoundedRect(barX, barY, barWidth * progress.value, barHeight, 10);
        percentText.setText(Math.floor(progress.value * 100) + '%');
      },
      onComplete: () => {
        loadText.setText('Ready! 🚀');
        this.time.delayedCall(400, () => {
          this.scene.start('MenuScene');
        });
      }
    });
  }
}
