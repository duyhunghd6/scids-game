import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';

const TILE_SIZE = 64;
const HUB_DECORATIONS = [
  { key: 'telescope', name: 'Window Telescope', price: 12, description: 'A stargazing scope for space discoveries.' },
  { key: 'skeleton', name: 'Skeleton Model', price: 18, description: 'A life-science display beside the door.' },
  { key: 'bunsen', name: 'Bunsen Burner', price: 9, description: 'A warm chemistry corner for experiments.' },
];

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    this.hubCoins = this.registry.get('hubCoins') ?? 0;
    this.purchasedDecorations = this.registry.get('purchasedDecorations') ?? [];

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x5C94FC, 0x5C94FC, 0x1a1a2e, 0x1a1a2e, 1);
    bg.fillRect(0, 0, width, height);

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

    this.coinText = this.add.text(width - 24, 28, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffd700',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(1, 0.5);
    this.refreshCoinText();

    this.createLevelTilemap();
    this.drawLabShell(width, height);
    this.drawPurchasedDecorations(width, height);
    this.createDecorationShop(width, height);

    this.player = this.physics.add.sprite(100, height - 100, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, 0, width, height);
    this.physics.add.collider(this.player, this.groundLayer);

    this.topicBlocks = this.physics.add.staticGroup();
    const startX = 200;
    const spacing = (width - 300) / Math.max(1, TOPICS.length - 1);

    TOPICS.forEach((topic, i) => {
      const bx = startX + (i * spacing);
      const by = height - 180;
      const block = this.topicBlocks.create(bx, by, 'qblock');
      block.setData('topicIndex', i);

      this.add.text(bx, by - 40, `${topic.emoji}\n${topic.name}`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      }).setOrigin(0.5);
    });

    this.physics.add.collider(this.player, this.topicBlocks, this.hitBlock, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
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

  drawLabShell(width, height) {
    const lab = this.add.graphics();
    lab.fillStyle(0x23395d, 0.85);
    lab.fillRoundedRect(24, 150, width - 48, 220, 24);
    lab.fillStyle(0x18263d, 1);
    lab.fillRect(56, 190, 200, 120);
    lab.lineStyle(6, 0xaed6f1, 1);
    lab.strokeRect(56, 190, 200, 120);
    lab.lineStyle(6, 0x8b5a2b, 1);
    lab.strokeRoundedRect(width - 180, 186, 92, 150, 18);
    lab.lineStyle(4, 0x5d4037, 1);
    lab.strokeRect(300, 235, 170, 18);
    lab.strokeRect(500, 235, 170, 18);
    lab.lineStyle(3, 0xf5f5f5, 0.8);
    lab.strokeRect(320, 172, 82, 46);
    lab.strokeRect(420, 172, 82, 46);
    lab.strokeRect(520, 172, 82, 46);
  }

  drawPurchasedDecorations(width, height) {
    const decorations = new Set(this.purchasedDecorations);

    if (decorations.has('telescope')) {
      const telescope = this.add.graphics();
      telescope.fillStyle(0xc0c7cf, 1);
      telescope.fillRect(112, 226, 68, 14);
      telescope.fillStyle(0x7f8c8d, 1);
      telescope.fillTriangle(170, 240, 200, 300, 182, 300);
      telescope.fillTriangle(150, 240, 130, 300, 146, 300);
      telescope.fillStyle(0xf1c40f, 1);
      telescope.fillCircle(112, 233, 10);
    }

    if (decorations.has('skeleton')) {
      const skeleton = this.add.graphics();
      skeleton.lineStyle(5, 0xf5f1e6, 1);
      skeleton.strokeCircle(width - 124, 204, 18);
      skeleton.beginPath();
      skeleton.moveTo(width - 124, 224);
      skeleton.lineTo(width - 124, 284);
      skeleton.moveTo(width - 150, 246);
      skeleton.lineTo(width - 98, 246);
      skeleton.moveTo(width - 124, 284);
      skeleton.lineTo(width - 146, 324);
      skeleton.moveTo(width - 124, 284);
      skeleton.lineTo(width - 102, 324);
      skeleton.strokePath();
    }

    if (decorations.has('bunsen')) {
      const burner = this.add.graphics();
      burner.fillStyle(0x4b6584, 1);
      burner.fillRoundedRect(542, 200, 36, 44, 8);
      burner.fillStyle(0x95a5a6, 1);
      burner.fillRect(554, 168, 12, 42);
      burner.fillStyle(0xf39c12, 1);
      burner.fillTriangle(560, 144, 548, 170, 572, 170);
      burner.fillStyle(0xf1c40f, 0.9);
      burner.fillTriangle(560, 150, 553, 168, 567, 168);
    }
  }

  createDecorationShop(width, height) {
    this.shopMessage = this.add.text(width / 2, 402, 'Spend coins on lab upgrades. Purchased items stay in your hub.', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#e8f6ff',
    }).setOrigin(0.5);

    HUB_DECORATIONS.forEach((item, index) => {
      const x = 160 + (index * 240);
      const y = 470;
      this.createShopCard(x, y, item);
    });
  }

  createShopCard(x, y, item) {
    const owned = this.purchasedDecorations.includes(item.key);
    const card = this.add.graphics();
    card.fillStyle(0x1b263b, 0.92);
    card.fillRoundedRect(x - 95, y - 58, 190, 116, 18);
    card.lineStyle(3, owned ? 0x2ecc71 : 0x5dade2, 1);
    card.strokeRoundedRect(x - 95, y - 58, 190, 116, 18);

    this.add.text(x, y - 28, item.name, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 150 },
    }).setOrigin(0.5);

    this.add.text(x, y - 2, item.description, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: '#d6eaf8',
      align: 'center',
      wordWrap: { width: 154 },
    }).setOrigin(0.5);

    const buttonLabel = owned ? 'Installed' : `Buy ${item.price} coins`;
    const buttonColor = owned ? '#2ecc71' : '#ffd166';
    const button = this.add.text(x, y + 34, buttonLabel, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: buttonColor,
      backgroundColor: '#0f172a',
      padding: { left: 12, right: 12, top: 8, bottom: 8 },
    }).setOrigin(0.5);

    if (!owned) {
      button.setInteractive({ useHandCursor: true });
      button.on('pointerdown', () => this.purchaseDecoration(item));
    }
  }

  purchaseDecoration(item) {
    if (this.purchasedDecorations.includes(item.key)) {
      return;
    }

    if (this.hubCoins < item.price) {
      this.shopMessage.setText(`Not enough coins for ${item.name}. Earn more in quiz levels.`);
      return;
    }

    this.hubCoins -= item.price;
    this.purchasedDecorations = [...this.purchasedDecorations, item.key];
    this.registry.set('hubCoins', this.hubCoins);
    this.registry.set('purchasedDecorations', this.purchasedDecorations);
    this.shopMessage.setText(`${item.name} installed in the lab.`);
    this.scene.restart();
  }

  refreshCoinText() {
    this.coinText.setText(`Coins: ${this.hubCoins}`);
  }

  hitBlock(player, block) {
    if (player.body.touching.up && block.body.touching.down) {
      const topicIndex = block.getData('topicIndex');

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

    if (isUp && this.player.body.blocked.down) {
      this.player.setVelocityY(-450);
    }
  }
}
