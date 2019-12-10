import { detectCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;
    this.image = game.ballImage;
    this.position = { x: 50, y: 200 };
    this.size = 20;

    this.speed = {
      x: 2,
      y: 2
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // left right ball collision check
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // top bottom ball collision check
    if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
      this.speed.y = -this.speed.y;

      /* to pause the the game;
                ||
                \/           */

      // this.position.x = 10;
      // this.position.y = 10;
      // this.speed.x = 0;
      // this.speed.y = 0;
    }

    // paddle ball collision check
    // if (
    //   bottomOfBall >= topOfPaddle &&
    //   this.position.x >= leftSideOfPaddle &&
    //   this.position.x + this.size <= rightSideOfPaddle
    // )
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
