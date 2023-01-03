export class PlayerTank {
  constructor({ context, x, y, color, properties, shootBullet }) {
    this.position = { x, y };
    this.mousePosition = { x: 0, y: 0 };
    this.width = 25;
    this.height = 25;
    this.color = color;
    this.properties = properties;
    this.context = context;
    this.showLaser = false;
    this.shootBullet = shootBullet;
    this.health = this.properties.max_health || 100;

    window.addEventListener("mousemove", (event) => {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      this.redraw();
    });

    window.addEventListener("click", (event) => {
      this.shoot();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "l") {
        this.showLaser = !this.showLaser;
        this.redraw();
      }

      if (event.key === " ") {
        this.shoot();
      }
    });
  }

  shoot() {
    // shoot a bullet
    this.shootBullet({
      fromX: this.position.x,
      fromY: this.position.y,
      toX: this.mousePosition.x,
      toY: this.mousePosition.y,
      properties: {
        speed: this.properties.bullet_speed || 1,
      },
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

  drawLaser() {
    if (!this.showLaser) return;
    // basically a line between the tank center and the mouse position, opacity should be 0.5
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(this.position.x, this.position.y);
    this.context.lineTo(this.mousePosition.x, this.mousePosition.y);
    this.context.strokeStyle = "rgba(255, 0, 0, 0.5)";
    this.context.stroke();
    this.context.restore();
  }

  draw() {
    this.drawBarrel();
    this.drawBody();
    this.drawLaser();
  }

  async die() {
    console.log("DIE!");

    this.undraw();

    // remove the tank from the game
    document.dispatchEvent(
      new CustomEvent("player_death", {
        detail: {
          entity: this,
        },
      })
    );
  }

  undraw() {
    // clear the canvas in the area of the tank, but with enough space to clear the barrel
    // this.context.clearRect(
    //   this.position.x - this.width * 4,
    //   this.position.y - this.height * 4,
    //   this.width * 8,
    //   this.height * 8
    // );

    // clear the entire canvas
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
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

  getSpeed({ deltaTime }) {
    return Math.round(
      (Math.ceil((this.properties.speed || 1) * 10) * deltaTime) / 150
    );
  }

  updatePositionFromKeys(keys, deltaTime) {
    const speed = this.getSpeed({ deltaTime });

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
