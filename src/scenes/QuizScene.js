import * as Phaser from 'phaser';
import TOPICS from '../data/questions.js';

export class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizScene' });
  }

  init(data) {
    this.topicIndex = data.topicIndex ?? 0;
    this.score = 0;
    this.currentQ = 0;
    this.answered = false;
    this.hintShown = false;

    // Assemble questions
    if (this.topicIndex === -1) {
      // Play all – pick 3 random from each topic (max 15)
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

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x16213e, 0x0f3460, 0x1a1a2e, 1);
    bg.fillRect(0, 0, width, height);

    // Top bar
    this.createTopBar(width);

    // Content area – will be rebuilt each question
    this.contentContainer = this.add.container(0, 0);

    this.showQuestion();
  }

  createTopBar(width) {
    // Topic header
    const headerBg = this.add.graphics();
    headerBg.fillStyle(this.topicColor, 0.9);
    headerBg.fillRect(0, 0, width, 50);

    this.add.text(15, 25, `${this.topicEmoji} ${this.topicName}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0, 0.5);

    // Score display
    this.scoreText = this.add.text(width - 15, 15, `⭐ ${this.score}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#ffd700',
    }).setOrigin(1, 0);

    // Progress text
    this.progressText = this.add.text(width - 15, 35, `Q ${this.currentQ + 1}/${this.totalQ}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: '#ffffffaa',
    }).setOrigin(1, 0);

    // Progress bar
    const barY = 50;
    this.progressBarBg = this.add.graphics();
    this.progressBarBg.fillStyle(0x333333);
    this.progressBarBg.fillRect(0, barY, width, 4);

    this.progressBarFill = this.add.graphics();
    this.updateProgressBar(width);

    // Back button
    const backBtn = this.add.text(width / 2, 25, '✖', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#ffffff88',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }

  updateProgressBar(width) {
    this.progressBarFill.clear();
    this.progressBarFill.fillStyle(0xe94560);
    const progress = (this.currentQ) / this.totalQ;
    this.progressBarFill.fillRect(0, 50, width * progress, 4);
  }

  showQuestion() {
    const { width, height } = this.scale;
    this.contentContainer.removeAll(true);
    this.answered = false;
    this.hintShown = false;

    if (this.currentQ >= this.totalQ) {
      this.scene.start('ResultScene', {
        score: this.score,
        total: this.totalQ,
        topicName: this.topicName,
        topicEmoji: this.topicEmoji,
        topicColor: this.topicColor,
        topicIndex: this.topicIndex,
      });
      return;
    }

    const q = this.questions[this.currentQ];

    // Update header
    this.progressText.setText(`Q ${this.currentQ + 1}/${this.totalQ}`);
    this.updateProgressBar(width);

    // Question number badge
    const badge = this.add.graphics();
    badge.fillStyle(this.topicColor, 0.6);
    badge.fillRoundedRect(width / 2 - 25, 68, 50, 24, 12);
    this.contentContainer.add(badge);

    const badgeText = this.add.text(width / 2, 80, `${this.currentQ + 1}/${this.totalQ}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);
    this.contentContainer.add(badgeText);

    // Question text
    const questionText = this.add.text(width / 2, 130, q.question, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: width - 80 },
      lineSpacing: 6,
    }).setOrigin(0.5);
    this.contentContainer.add(questionText);

    // Calculate answer button positions
    const qTextBottom = questionText.y + questionText.height / 2;
    const btnStartY = Math.max(qTextBottom + 30, 200);
    const btnW = 340;
    const btnH = 48;
    const btnGap = 10;

    // Answer buttons
    q.options.forEach((option, i) => {
      const btnY = btnStartY + i * (btnH + btnGap);
      this.createAnswerButton(width / 2, btnY, btnW, btnH, option, i, q);
    });

    // Hint button
    const hintY = btnStartY + q.options.length * (btnH + btnGap) + 10;
    this.createHintButton(width / 2, hintY, q.hint);

    // Entrance animation
    this.contentContainer.setAlpha(0);
    this.tweens.add({ targets: this.contentContainer, alpha: 1, duration: 300 });
  }

  createAnswerButton(x, y, w, h, text, index, question) {
    const container = this.add.container(x, y);

    const letterLabels = ['A', 'B', 'C', 'D'];

    // Button background
    const bg = this.add.graphics();
    bg.fillStyle(0x2d2d5e, 0.9);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    bg.lineStyle(2, 0x4a4a8a, 0.8);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    // Letter badge
    const letterBg = this.add.graphics();
    letterBg.fillStyle(0x4a4a8a);
    letterBg.fillCircle(-w / 2 + 24, 0, 14);

    const letter = this.add.text(-w / 2 + 24, 0, letterLabels[index], {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Answer text
    const label = this.add.text(-w / 2 + 50, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      color: '#ffffff',
      wordWrap: { width: w - 75 },
    }).setOrigin(0, 0.5);

    container.add([bg, letterBg, letter, label]);
    this.contentContainer.add(container);

    // Hit area
    const hitArea = this.add.rectangle(x, y, w, h, 0x000000, 0).setInteractive({ useHandCursor: true });
    this.contentContainer.add(hitArea);

    hitArea.on('pointerover', () => {
      if (!this.answered) {
        this.tweens.add({ targets: container, scaleX: 1.03, scaleY: 1.03, duration: 100 });
      }
    });
    hitArea.on('pointerout', () => {
      if (!this.answered) {
        this.tweens.add({ targets: container, scaleX: 1, scaleY: 1, duration: 100 });
      }
    });

    hitArea.on('pointerdown', () => {
      if (this.answered) return;
      this.answered = true;
      const isCorrect = index === question.correct;

      if (isCorrect) {
        this.score += 10;
        this.scoreText.setText(`⭐ ${this.score}`);

        // Green glow
        bg.clear();
        bg.fillStyle(0x27ae60, 0.95);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

        // Bounce
        this.tweens.add({
          targets: container,
          scaleX: 1.1, scaleY: 1.1,
          duration: 150, yoyo: true,
        });

        // Confetti!
        this.createConfetti(x, y);

        // Correct feedback
        const feedback = this.add.text(this.scale.width / 2, this.scale.height - 50, '✅ Correct! Well done!', {
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          fontStyle: 'bold',
          color: '#2ecc71',
        }).setOrigin(0.5);
        this.contentContainer.add(feedback);

      } else {
        // Red shake
        bg.clear();
        bg.fillStyle(0xe74c3c, 0.95);
        bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);

        this.tweens.add({
          targets: container,
          x: container.x - 8,
          duration: 50,
          yoyo: true,
          repeat: 3,
        });

        // Show correct answer
        const feedback = this.add.text(this.scale.width / 2, this.scale.height - 50,
          `❌ The answer is: ${question.options[question.correct]}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          color: '#e74c3c',
          align: 'center',
          wordWrap: { width: this.scale.width - 60 },
        }).setOrigin(0.5);
        this.contentContainer.add(feedback);
      }

      // Next question after delay
      this.time.delayedCall(isCorrect ? 1200 : 2200, () => {
        this.currentQ++;
        this.showQuestion();
      });
    });
  }

  createHintButton(x, y, hintText) {
    const container = this.add.container(x, y);

    const label = this.add.text(0, 0, '💡 Show Hint', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: '#f39c12',
    }).setOrigin(0.5);

    container.add([label]);
    this.contentContainer.add(container);

    label.setInteractive({ useHandCursor: true });
    label.on('pointerdown', () => {
      if (this.hintShown) return;
      this.hintShown = true;

      label.setText('');

      const hintBg = this.add.graphics();
      hintBg.fillStyle(0xf39c12, 0.2);
      hintBg.fillRoundedRect(-160, 8, 320, 35, 8);
      container.add(hintBg);

      const hint = this.add.text(0, 25, `💡 ${hintText}`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '11px',
        color: '#f39c12',
        align: 'center',
        wordWrap: { width: 300 },
      }).setOrigin(0.5);
      container.add(hint);
    });
  }

  createConfetti(x, y) {
    const colors = [0xe94560, 0xffd700, 0x2ecc71, 0x3498db, 0x9b59b6, 0xf39c12];
    for (let i = 0; i < 15; i++) {
      const size = Phaser.Math.Between(4, 8);
      const confetti = this.add.graphics();
      confetti.fillStyle(Phaser.Utils.Array.GetRandom(colors));
      confetti.fillRect(-size / 2, -size / 2, size, size);
      confetti.setPosition(x, y);
      this.contentContainer.add(confetti);

      const angle = Phaser.Math.Between(0, 360);
      const speed = Phaser.Math.Between(100, 250);
      const dx = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
      const dy = Math.sin(Phaser.Math.DegToRad(angle)) * speed - 150;

      this.tweens.add({
        targets: confetti,
        x: confetti.x + dx,
        y: confetti.y + dy + 200,
        alpha: 0,
        angle: Phaser.Math.Between(-360, 360),
        duration: Phaser.Math.Between(600, 1200),
        ease: 'Quad.easeOut',
      });
    }
  }
}
