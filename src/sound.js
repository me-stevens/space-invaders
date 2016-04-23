class Sound {
  constructor(userinterface) {
    this.sounds = {
      background: userinterface.getId('background-sound'),
      invader: userinterface.getId('fastinvader-sound'),
      bang: userinterface.getId('bang-sound'),
      shoot: userinterface.getId('shoot-sound'),
      explosion: userinterface.getId('explosion-sound'),
      playerwins: userinterface.getId('playerwins-sound')
    }

    this.stopBackground = () => {
      let background = this.sounds.background;
      background.pause();
      background.currentTime = 0;
    }

    this.loadSounds();
  }

  loadSounds() {
    Object.entries(this.sounds).forEach(([name, sound]) => {
      sound.load();
    });

    this.sounds.background.loop = true;
  }

  playBackground() {
    this.sounds.background.play();
  }

  playInvader() {
    this.sounds.invader.play();
  }

  playBang() {
    this.sounds.bang.play();
  }

  playShoot() {
    this.sounds.shoot.play();
  }

  lifeOver() {
    this.sounds.explosion.play();
    this.stopBackground();
    this.playBackground();
  }

  gameOver() {
    this.sounds.explosion.play();
    this.stopBackground();
  }

  playerWins() {
    this.sounds.playerwins.play();
    this.stopBackground();
  }
}
