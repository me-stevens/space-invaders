class Bullet {
  constructor(game, center, velocity) {
    this.game = game;
    this.center = center;
    this.velocity = velocity;
    this.size = { x: 3, y: 3 };
  }

  update() {
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
  }

  draw() {
    this.game.geometry.drawBullet(this);
  }
}
