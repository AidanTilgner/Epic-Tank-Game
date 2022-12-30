export class PlayerTank {
  constructor({ context, x, y, color, properties }) {
    this.previousPosition = { x, y };
    this.position = { x, y };
    this.width = 25;
    this.height = 25;
    this.color = color;
    this.properties = properties;
    this.context = context;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.ellipse(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      0,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  undraw() {
    // clear the previous ellipse, by drawing another ellipse over it
    this.context.fillStyle = "white";
    this.context.beginPath();
    this.context.ellipse(
      this.previousPosition.x,
      this.previousPosition.y,
      this.width + 1,
      this.height + 1,
      0,
      0,
      2 * Math.PI
    );
    this.context.fill();
    this.previousPosition = { ...this.position };
  }

  redraw() {
    this.undraw();
    this.draw();
  }

  update({ keys, deltaTime }) {
    let requiresRedraw = false;
    requiresRedraw = this.updatePositionFromKeys(keys, deltaTime);

    if (requiresRedraw) {
      this.redraw();
    }
  }

  updatePositionFromKeys(keys, deltaTime) {
    const speed = Math.round(
      (Math.ceil((this.properties.speed || 1) * 10) * deltaTime) / 100
    );

    let updated = false;
    if (keys.LEFT.pressed) {
      // * Move the tank to the left
      this.position.x -= speed;
      updated = true;
    }

    if (keys.RIGHT.pressed) {
      // * Move the tank to the right
      this.position.x += speed;
      updated = true;
    }

    if (keys.UP.pressed) {
      // * Move the tank up
      this.position.y -= speed;
      updated = true;
    }

    if (keys.DOWN.pressed) {
      // * Move the tank down
      this.position.y += speed;
      updated = true;
    }

    if (keys.SPACE.pressed) {
      // * Shoot a bullet
    }

    // this is now an ellipse
    if (this.position.x - this.width < 0) {
      this.position.x = this.width;
      updated = true;
    }

    if (this.position.x + this.width > this.context.canvas.width) {
      this.position.x = this.context.canvas.width - this.width;
      updated = true;
    }

    if (this.position.y - this.height < 0) {
      this.position.y = this.height;
      updated = true;
    }

    if (this.position.y + this.height > this.context.canvas.height) {
      this.position.y = this.context.canvas.height - this.height;
      updated = true;
    }

    return updated;
  }
}
