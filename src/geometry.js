class Geometry {
  constructor(userinterface) {
    let canvas = userinterface.getCanvas();

    this.size = { x: canvas.width, y: canvas.height };
    this.screen = canvas.getContext('2d');
    this.images = userinterface.images;

    this.drawImage = (body, image) => {
      this.screen.drawImage(
        image,
        body.center.x - body.size.x / 2,
        body.center.y - body.size.y / 2,
        body.size.x,
        body.size.y
      );
    }
  }

  clearScreen() {
    this.screen.clearRect(0, 0, this.size.x, this.size.y);
  }

  drawInvader(invader) {
    this.drawImage(invader, this.images.invader);
  }

  drawPlayer(player) {
    this.drawImage(player, this.images.player);
  }

  drawBullet(bullet) {
    this.screen.fillStyle = '#00c4fe';
    this.screen.fillRect(
      bullet.center.x - bullet.size.x / 2,
      bullet.center.y - bullet.size.y / 2,
      bullet.size.x,
      bullet.size.y
    );
  }

  drawStats(stats) {
    this.screen.font = `${stats.size.y}px "Press Start 2P", cursive`;
    this.screen.fillText(`SCORE: ${stats.score}`, stats.center.x, stats.center.y);

    for (let i = 0; i < stats.lives; i++) {
      this.screen.drawImage(
        this.images.heart,
        stats.size.x - (2 * i) * stats.heartSize.x,
        stats.center.y - stats.heartSize.y,
        stats.heartSize.x,
        stats.heartSize.y
      );
    }
  }

  colliding(body1, body2) {
    function isSameBody(body1, body2) {
      return body1 === body2;
    }

    function isRightSideLeftOfLeftSide(body1, body2) {
      return body1.center.x + body1.size.x / 2 < body2.center.x - body2.size.x / 2;
    }

    function isBottomSideAboveTopSide(body1, body2) {
      return body1.center.y + body1.size.y / 2 < body2.center.y - body2.size.y / 2;
    }

    function isLeftSideRightOfRightSide(body1, body2) {
      return body1.center.x - body1.size.x / 2 > body2.center.x + body2.size.x / 2;
    }

    function isTopSideBelowBottomSide(body1, body2) {
      return body1.center.y - body1.size.y / 2 > body2.center.y + body2.size.y / 2;
    }

    return !(
      isSameBody(body1, body2) ||
      isRightSideLeftOfLeftSide(body1, body2) ||
      isBottomSideAboveTopSide(body1, body2) ||
      isLeftSideRightOfRightSide(body1, body2) ||
      isTopSideBelowBottomSide(body1, body2)
    );
  }
}
