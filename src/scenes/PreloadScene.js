import * as Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('science-volcano-cross-section', 'assets/science/volcano-cross-section.png');
    this.load.image('science-human-skeleton', 'assets/science/human-skeleton.png');
    this.load.image('science-circuit-components', 'assets/science/circuit-components.png');
    this.load.spritesheet('player', 'assets/mario/mario_bros.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    const { width, height } = this.scale;

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x5C94FC, 0x5C94FC, 0x1a1a2e, 0x1a1a2e, 1);
    bg.fillRect(0, 0, width, height);

    this.add.text(width / 2, height / 2, 'Generating Lab Assets...', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const groundGraphics = this.add.graphics();
    groundGraphics.fillStyle(0x8B4513);
    groundGraphics.fillRect(0, 0, 64, 64);
    groundGraphics.lineStyle(2, 0x2E8B57);
    groundGraphics.strokeRect(0, 0, 64, 64);
    groundGraphics.generateTexture('ground', 64, 64);
    groundGraphics.destroy();

    const blockGraphics = this.add.graphics();
    blockGraphics.fillStyle(0xFFD700);
    blockGraphics.fillRect(0, 0, 48, 48);
    blockGraphics.lineStyle(4, 0xDAA520);
    blockGraphics.strokeRect(0, 0, 48, 48);
    blockGraphics.fillStyle(0x000000);
    blockGraphics.fillRect(16, 12, 16, 8);
    blockGraphics.fillRect(24, 20, 8, 8);
    blockGraphics.fillRect(20, 32, 8, 8);
    blockGraphics.generateTexture('qblock', 48, 48);
    blockGraphics.destroy();

    const hitGraphics = this.add.graphics();
    hitGraphics.fillStyle(0x8B4513);
    hitGraphics.fillRect(0, 0, 48, 48);
    hitGraphics.lineStyle(4, 0x5C3A21);
    hitGraphics.strokeRect(0, 0, 48, 48);
    hitGraphics.generateTexture('block_hit', 48, 48);
    hitGraphics.destroy();

    const particleGraphics = this.add.graphics();
    particleGraphics.fillStyle(0xffffff);
    particleGraphics.fillCircle(6, 6, 6);
    particleGraphics.generateTexture('particle', 12, 12);
    particleGraphics.destroy();

    const pipeGraphics = this.add.graphics();
    pipeGraphics.fillStyle(0x2f9e44);
    pipeGraphics.fillRect(0, 14, 64, 82);
    pipeGraphics.fillStyle(0x43c15d);
    pipeGraphics.fillRect(0, 0, 64, 22);
    pipeGraphics.fillRect(8, 18, 48, 8);
    pipeGraphics.lineStyle(4, 0x1b5e20);
    pipeGraphics.strokeRect(0, 14, 64, 82);
    pipeGraphics.strokeRect(0, 0, 64, 22);
    pipeGraphics.generateTexture('warp_pipe', 64, 96);
    pipeGraphics.destroy();

    const lavaGraphics = this.add.graphics();
    lavaGraphics.fillStyle(0xff6b35);
    lavaGraphics.fillRoundedRect(0, 0, 96, 24, 10);
    lavaGraphics.fillStyle(0xffb347);
    lavaGraphics.fillCircle(18, 10, 6);
    lavaGraphics.fillCircle(46, 8, 5);
    lavaGraphics.fillCircle(74, 10, 6);
    lavaGraphics.generateTexture('lava', 96, 24);
    lavaGraphics.destroy();

    const orbGraphics = this.add.graphics();
    orbGraphics.fillStyle(0xfff27a);
    orbGraphics.fillCircle(12, 12, 10);
    orbGraphics.lineStyle(2, 0xffffff);
    orbGraphics.strokeCircle(12, 12, 10);
    orbGraphics.generateTexture('photon_orb', 24, 24);
    orbGraphics.destroy();

    const badgeGraphics = this.add.graphics();
    badgeGraphics.fillStyle(0xffd54f);
    badgeGraphics.fillCircle(28, 28, 24);
    badgeGraphics.lineStyle(4, 0xf57f17);
    badgeGraphics.strokeCircle(28, 28, 24);
    badgeGraphics.fillStyle(0x5d4037);
    badgeGraphics.fillRect(24, 14, 8, 18);
    badgeGraphics.fillRect(18, 20, 20, 8);
    badgeGraphics.fillStyle(0xe53935);
    badgeGraphics.fillTriangle(16, 42, 24, 58, 28, 42);
    badgeGraphics.fillTriangle(40, 42, 32, 58, 28, 42);
    badgeGraphics.generateTexture('galileo_badge', 56, 60);
    badgeGraphics.destroy();

    this.time.delayedCall(400, () => {
      this.scene.start('MenuScene');
    });
  }
}
