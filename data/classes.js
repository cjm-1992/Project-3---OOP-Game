//Class built for collision boundaries -- PLACE IN CLASS.JS ON COMPLETION
class Loadables {
    constructor({ position, image, frames = { max: 1 } }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.myLoad = () => {
          this.width = this.image.width / this.frames.max;
          this.height = this.image.height;
        }
    }

  draw() {
    this.width = this.image.width / this.frames.max;
    this.height = this.image.height;

    cntx.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    }
}

class Boundary {
  static width = 64;
  static height = 64;
  constructor({ position }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    cntx.fillStyle = "rgba(255, 0, 0,0)"
    cntx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Overworld {
  constructor(config) {
  this.element = config.element;
  this.canvas = this.element.querySelector(".game-canvas");
  this.ctx = this.canvas.getContext("2d");
  this.map = null;
  }
  startGameLoop () {
  const step = () => {

    this.map.drawMap(this.ctx);
    Object.values(this.map.gameObjects).forEach (object => {
      object.sprite.draw(this.ctx);
    })
    requestAnimationFrame(() => {
    step();
    })
  }
  step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.room0)
    this.startGameLoop ();
  }
}
