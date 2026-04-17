import * as Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  create() {
    const { width, height } = this.scale;

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x5C94FC, 0x5C94FC, 0x1a1a2e, 0x1a1a2e, 1);
    bg.fillRect(0, 0, width, height);

    const loadText = this.add.text(width / 2, height / 2, 'Generating Lab Assets...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Generate Player Texture
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0xe94560);
    playerGraphics.fillRect(0, 0, 32, 48);
    playerGraphics.generateTexture('player', 32, 48);
    playerGraphics.destroy();

    // Generate Ground Texture
    const groundGraphics = this.add.graphics();
    groundGraphics.fillStyle(0x8B4513);
    groundGraphics.fillRect(0, 0, 64, 64);
    groundGraphics.lineStyle(2, 0x2E8B57);
    groundGraphics.strokeRect(0, 0, 64, 64);
    groundGraphics.generateTexture('ground', 64, 64);
    groundGraphics.destroy();

    // Generate Question Block Texture
    const blockGraphics = this.add.graphics();
    blockGraphics.fillStyle(0xFFD700);
    blockGraphics.fillRect(0, 0, 48, 48);
    blockGraphics.lineStyle(4, 0xDAA520);
    blockGraphics.strokeRect(0, 0, 48, 48);
    // Draw a question mark
    blockGraphics.fillStyle(0x000000);
    // simple representation
    blockGraphics.fillRect(16, 12, 16, 8);
    blockGraphics.fillRect(24, 20, 8, 8);
    blockGraphics.fillRect(20, 32, 8, 8);
    blockGraphics.generateTexture('qblock', 48, 48);
    blockGraphics.destroy();

    // Generate Empty Block Texture (Hit)
    const hitGraphics = this.add.graphics();
    hitGraphics.fillStyle(0x8B4513);
    hitGraphics.fillRect(0, 0, 48, 48);
    hitGraphics.lineStyle(4, 0x5C3A21);
    hitGraphics.strokeRect(0, 0, 48, 48);
    hitGraphics.generateTexture('block_hit', 48, 48);
    hitGraphics.destroy();

    this.time.delayedCall(400, () => {
      this.scene.start('MenuScene');
    });
  }
}
