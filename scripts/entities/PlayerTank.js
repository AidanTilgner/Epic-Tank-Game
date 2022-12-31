export class PlayerTank {
  constructor({ context, x, y, color, properties }) {
    this.position = { x, y };
    this.mousePosition = { x: 0, y: 0 };
    this.width = 25;
    this.height = 25;
    this.color = color;
    this.properties = properties;
    this.context = context;

    this.context.canvas.addEventListener("mousemove", (event) => {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      this.redraw();
    });
  }

  drawBody() {
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

  drawBarrel() {
    const angle = Math.atan2(
      this.mousePosition.y - this.position.y,
      this.mousePosition.x - this.position.x
    );
    this.context.save();
    // the barrel should be half the width of the tank, and be centered on the tank
    this.context.translate(this.position.x, this.position.y);
    this.context.rotate(angle);
    this.context.fillStyle = "black";
    this.context.fillRect(0, -this.width / 4, this.width * 2, this.width / 2);
    this.context.restore();
  }

  draw() {
    this.drawBarrel();
    this.drawBody();
  }

  undraw() {
    // clear the canvas in the area of the tank, but with enough space to clear the barrel
    this.context.clearRect(
      this.position.x - (this.width * 4),
      this.position.y - (this.height * 4),
      this.width * 8,
      this.height * 8
    );
  }

  redraw() {
    this.undraw();
    this.draw();

    requestAnimationFrame(() => {
      this.redraw();
    });
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
