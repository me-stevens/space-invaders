class Invader {
  static createPack(game) {
    let totalInvaders = 24, rows = 3, cols = 8,
    maxRange = (new Invader(null, null)).maximumRange;

    let i, invaders = [];

    for (i = 0; i < totalInvaders; i++) {
      let center = {
        x: maxRange * (1 + (i % cols)),
        y: maxRange * (1 + (i % rows))
      };
      invaders.push(new Invader(game, center));
    }

    return invaders;
  }

  static is(body) {
    return body instanceof Invader;
  }

  constructor(game, center) {
    this.game = game;
    this.center = center;
    this.size = { x: 15, y: 15 };

    this.patrolX = 0;
    this.speedX = 0.3;
    this.maximumRange = this.size.x * 2;
  }

  update() {
    this.patrol();
    this.shoot();
    this.game.sound.playInvader();
  }

  patrol() {
    this.center.x += this.speedX;
    this.patrolX += this.speedX;

    if (this.patrolX < 0 || this.patrolX > this.maximumRange) {
      this.speedX = -this.speedX;
    }
  }

  shoot() {
    if (Math.random() > 0.995 && !this.hasInvadersBelow(this.game.bodies)) {
      let bullet = new Bullet(
        this.game,
        { x: this.center.x, y: this.center.y + this.size.y / 2 },
        { x: Math.random() - 0.5, y: 2 }
      );

      this.game.addBullet(bullet);
      this.game.sound.playBang();
    }
  }

  hasInvadersBelow(bodies) {
    let self = this;

    function isInSameColumn(body) {
      return Math.abs(self.center.x - body.center.x) < body.size.x;
    }

    function isSomewhereBelow(body) {
      return body.center.y > self.center.y;
    }

    let invadersBelow = bodies.filter((body) => {
      return Invader.is(body) && isInSameColumn(body) && isSomewhereBelow(body);
    });

    return invadersBelow.length > 0;
  }

  draw() {
    this.game.geometry.drawInvader(this);
  }
}
