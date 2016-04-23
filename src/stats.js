class Stats {
  constructor(game) {
    this.game = game;

    let size = 10, margin = size * 2;
    this.size = { x: game.geometry.size.x - 2 * margin, y: size };
    this.center = { x: margin, y: game.geometry.size.y - margin };
    this.heartSize = { x: 15, y: 15 };

    this.score = 0;
    this.invaderPoints = 20;
    this.lives = 3;
  }

  update() {
    this.score = this.game.invadersKilled * this.invaderPoints;
  }

  draw() {
    this.game.geometry.drawStats(this);
  }

  lifeDown() {
    this.lives--;
  }

  noMoreLives() {
    return this.lives === 0;
  }
}
