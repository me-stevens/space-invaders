class Game {
  constructor(userinterface) {
    this.userinterface = userinterface;
    this.sound = new Sound(userinterface);
    this.geometry = new Geometry(userinterface);

    this.player = new Player(this);
    this.bodies = Invader.createPack(this).concat(this.player);
    this.stats = new Stats(this);

    this.invadersKilled = 0;
    this.play = true;
  }

  start() {
    this.sound.playBackground();

    let tick = () => {
      this.update();
      this.winOrDie();

      if (this.play) {
        this.draw();
        requestAnimationFrame(tick);
      }
    };

    tick();
  }

  update() {
    let notCollidingWithAnything = this.bodies.filter((body1) => {
      return this.bodies.filter((body2) => {
        return this.geometry.colliding(body1, body2);
      }).length === 0;
    });

    let updateKilledInvaders = () => {
      this.bodies.forEach((body) => {
        if (notCollidingWithAnything.indexOf(body) === -1 && Invader.is(body)) {
          this.invadersKilled++;
        }
      });
    }

    updateKilledInvaders();
    this.bodies = notCollidingWithAnything;

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }

    this.stats.update();
  }

  draw() {
    this.geometry.clearScreen();
    this.stats.draw();

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].draw();
    }
  }

  addBullet(bullet) {
    this.bodies.push(bullet);
  }

  winOrDie() {
    if (this.bodies.indexOf(this.player) == -1) {
      this.stats.lifeDown();

      if (this.stats.noMoreLives()) {
        return this.gameOver();
      }

      return this.lifeOver();
    }

    let invaders = this.bodies.filter((body) => {
      return Invader.is(body);
    });

    if (invaders.length === 0) {
      return this.playerWins()
    }
  }

  lifeOver() {
    this.bodies = Invader.createPack(this).concat(this.player);
    this.geometry.clearScreen();
    this.sound.lifeOver();
  }

  gameOver() {
    this.play = false;
    this.geometry.clearScreen();
    this.stats.draw();
    this.sound.gameOver();
    this.userinterface.gameOver();
  }

  playerWins() {
    this.play = false;
    this.geometry.clearScreen();
    this.stats.draw();
    this.sound.playerWins();
    this.userinterface.playerWins();
  }
}
