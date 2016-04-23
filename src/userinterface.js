class UserInterface {
  constructor() {
    this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
    this.keyState = {};

    this.isDown = (keyCode) => {
      return this.keyState[keyCode];
    }

    this.getId = (id) => {
      return document.getElementById(id);
    }

    this.images = {
      player: this.getId('player-image'),
      invader: this.getId('invader-image'),
      heart: this.getId('heart-image')
    };
  }

  initialize() {
    let self = this,
        playButton = this.getId('playgame'),
        gameoverButton = this.getId('gameover'),
        playerwinsButton = this.getId('playerwins'),
        canvas = this.getCanvas(),
        touchstart, touchend;

    playButton.addEventListener('click', () => {
      playButton.classList.add('hidden');
      (new Game(self)).start();
    });

    gameoverButton.addEventListener('click', () => {
      gameoverButton.classList.add('hidden');
      playButton.classList.remove('hidden');
    });

    playerwinsButton.addEventListener('click', () => {
      playerwinsButton.classList.add('hidden');
      playButton.classList.remove('hidden');
    });

    window.addEventListener('keydown', (event) => {
      self.keyState[event.keyCode] = true;
    });

    window.addEventListener('keyup', (event) => {
      self.keyState[event.keyCode] = false;
    });

    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      touchstart = event.changedTouches[0].clientX;
      self.keyState[self.KEYS.SPACE] = true;
    });

    canvas.addEventListener('touchend', (event) => {
      event.preventDefault();
      touchend = event.changedTouches[0].clientX;

      self.keyState[self.KEYS.SPACE] = touchstart === touchend;
      self.keyState[self.KEYS.LEFT] = touchstart > touchend;
      self.keyState[self.KEYS.RIGHT] = touchstart < touchend;
    });
  }

  getCanvas() {
    return this.getId('screen');
  }

  left() {
    return this.isDown(this.KEYS.LEFT);
  }

  right() {
    return this.isDown(this.KEYS.RIGHT);
  }

  shoot() {
    return this.isDown(this.KEYS.SPACE);
  }

  gameOver() {
    this.getId('gameover').classList.remove('hidden');
  }

  playerWins() {
    this.getId('playerwins').classList.remove('hidden');
  }
}
