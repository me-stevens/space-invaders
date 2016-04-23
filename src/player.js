class Player {
  constructor(game) {
    this.game = game;
    this.userinterface = game.userinterface;

    this.size = { x: 15, y: 15 };
    this.center = {
      x: game.geometry.size.x / 2,
      y: game.geometry.size.y - this.size.y * 3
    };
    this.STEPSIZE = 2;
  }

  update() {
    if (this.userinterface.left()) {
      return this.center.x -= this.STEPSIZE;
    }

    if (this.userinterface.right()) {
      return this.center.x += this.STEPSIZE;
    }

    if (this.userinterface.shoot()) {
      let bullet = new Bullet(
        this.game,
        { x: this.center.x, y: this.center.y - this.size.y - 10 },
        { x: 0, y: -7 }
      );

      this.game.addBullet(bullet);
      this.game.sound.playShoot();
    }
  }

  draw() {
    this.game.geometry.drawPlayer(this);
  }
}
