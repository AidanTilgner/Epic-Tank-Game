export class Blobber {
  // this is an enemy. It is a blob that moves around the screen and if it hits the player, it kills them.
  constructor({
    context,
    x,
    y,
    color,
    properties,
    shootBullet,
    gameState,
    killPlayer,
  }) {
    this.context = context;
    this.position = { x, y };
    this.width = 25;
    this.height = 25;
    this.color = color;
    this.properties = properties;
    this.shootBullet = shootBullet;
    this.health = 100;
    this.gameState = gameState;
    this.killPlayer = killPlayer;
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

  draw() {
    this.drawBody();
  }

  undraw() {
    this.context.clearRect(
      this.position.x - this.width * 4,
      this.position.y - this.height * 4,
      this.width * 8,
      this.height * 8
    );
  }

  getSpeed({ deltaTime }) {
    return Math.round(
      (Math.ceil((this.properties.speed || 1) * 10) * deltaTime) / 250
    );
  }

  checkCollisionWithPlayer() {
    const playerX = this.gameState.gameObjects.player.position.x;
    const playerY = this.gameState.gameObjects.player.position.y;

    const distance = Math.floor(Math.sqrt(
      (playerX - this.position.x) ** 2 + (playerY - this.position.y) ** 2
    ))

    if (distance < this.width) {
      this.killPlayer();
      return true;
    }

    return false;
  }

  checkPlayerIsAlive() {
    const health = this.gameState.gameObjects.player.health;

    if (health <= 0) {
      return false;
    }

    return true;
  }

  update({ deltaTime }) {
    this.speed = this.getSpeed({ deltaTime });
    if (!this.checkPlayerIsAlive()) {
      return;
    }
    this.checkCollisionWithPlayer();
    this.undraw();
    // get the direction to the player
    const playerX = this.gameState.gameObjects.player.position.x;
    const playerY = this.gameState.gameObjects.player.position.y;

    const direction = {
      x: playerX - this.position.x,
      y: playerY - this.position.y,
    };

    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);

    direction.x /= magnitude;
    direction.y /= magnitude;

    // move towards the player
    this.position.x += direction.x * this.speed;
    this.position.y += direction.y * this.speed;

    this.draw();
  }
}
