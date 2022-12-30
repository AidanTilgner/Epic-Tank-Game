export class PlayerTank {
  constructor({ context, x, y, width, height, color, properties }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.properties = properties;
    this.context = context;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.ellipse(
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  undraw() {
    this.context.fillStyle = "white";
    this.context.beginPath();
    this.context.ellipse(
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  updatePositionFromKeys(keys) {
    this.undraw();
    const speed = Math.ceil((this.properties.speed || 1) * 10);

    if (keys.LEFT.pressed) {
      // * Move the tank to the left
      this.x -= speed;
    }

    if (keys.RIGHT.pressed) {
      // * Move the tank to the right
      this.x += speed;
    }

    if (keys.UP.pressed) {
      // * Move the tank up
      this.y -= speed;
    }

    if (keys.DOWN.pressed) {
      // * Move the tank down
      this.y += speed;
    }

    if (keys.SPACE.pressed) {
      // * Shoot a bullet
    }

    // this is now an ellipse
    if (this.x - this.width < 0) {
      this.x = this.width;
    }

    if (this.x + this.width > this.context.canvas.width) {
      this.x = this.context.canvas.width - this.width;
    }

    if (this.y - this.height < 0) {
      this.y = this.height;
    }

    if (this.y + this.height > this.context.canvas.height) {
      this.y = this.context.canvas.height - this.height;
    }

    // redraw the tank
    this.draw();
  }
}
