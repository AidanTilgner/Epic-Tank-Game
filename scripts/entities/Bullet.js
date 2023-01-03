export class Bullet {
  constructor({
    context,
    fromX,
    fromY,
    toX,
    toY,
    color,
    properties,
    removeBullet,
  }) {
    this.id = Math.random(20).toString(36).substring(2, 15);
    this.width = 5;
    this.height = 5;
    this.color = color;
    this.context = context;
    this.position = { x: fromX, y: fromY };
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
    this.direction = this.calculateDirection();
    this.properties = properties; // speed, damage, etc
    this.removeBullet = removeBullet;
  }

  calculateDirection() {
    // get mouse position relative to the tank
    const dx = this.toX - this.fromX;
    const dy = this.toY - this.fromY;

    // calculate the angle between tank body and mouse
    const angle = Math.atan2(dy, dx);

    // calculate the direction of the bullet
    const direction = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    return direction;
  }

  draw() {
    // this will just be a circle, with a black outline
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
    // clear the canvas in the area of the bullet
    this.context.clearRect(
      this.position.x - this.width * 4,
      this.position.y - this.height * 4,
      this.width * 8,
      this.height * 8
    );
  }

  update({ deltaTime }) {
    this.undraw();
    // calculate the new position of the bullet based on the direction and speed
    this.position.x +=
      this.direction.x * ((this.properties.speed * deltaTime) / 10);
    this.position.y +=
      this.direction.y * ((this.properties.speed * deltaTime) / 10);

    // check if the bullet is out of bounds
    if (
      this.position.x < 0 ||
      this.position.x > this.context.canvas.width ||
      this.position.y < 0 ||
      this.position.y > this.context.canvas.height
    ) {
      this.removeBullet(this.id);
      return;
    }

    this.draw();

    return;
  }
}

export function spawnBullet({
  context,
  fromX,
  fromY,
  toX,
  toY,
  color,
  properties,
  removeBullet,
}) {
  return new Bullet({
    context,
    fromX,
    fromY,
    toX,
    toY,
    color,
    properties,
    removeBullet,
  });
}
