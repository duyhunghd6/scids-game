export class StateStore {
  static state = {
    completedUNIDs: {},
    score: 0,
    stars: 0
  };

  static recordAnswer(unid, isCorrect) {
    this.state.completedUNIDs[unid] = isCorrect;
    if (isCorrect) {
      this.state.score += 100;
    }
  }

  static getCorrectCount() {
    return Object.values(this.state.completedUNIDs).filter(v => v).length;
  }

  static getScore() {
    return this.state.score;
  }

  static isCompleted(unid) {
    return this.state.completedUNIDs[unid] !== undefined;
  }

  static reset() {
    this.state.completedUNIDs = {};
    this.state.score = 0;
    this.state.stars = 0;
  }
}
