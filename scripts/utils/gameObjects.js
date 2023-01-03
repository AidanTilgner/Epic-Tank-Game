import { PlayerTank } from "../entities/PlayerTank.js";
import { spawnBullet } from "../entities/Bullet.js";

export const initGameObjects = ({ tank_context, bullet_context }) => {
  const gameObjects = {};
  const player = new PlayerTank({
    context: tank_context,
    x: 100,
    y: 100,
    color: "red",
    properties: {
      speed: 5,
      bullet_speed: 5,
    },
    shootBullet: ({ fromX, fromY, toX, toY }) => {
      const bullet = spawnBullet({
        context: bullet_context,
        fromX,
        fromY,
        toX,
        toY,
        color: "black",
        properties: {
          speed: 5,
        },
        removeBullet: (id) => {
          gameObjects.bullets.delete(id);
        },
      });
      gameObjects.bullets.set(bullet.id, bullet);
    },
  });

  gameObjects.player = player;

  gameObjects.bullets = new Map();

  return gameObjects;
};

export const updateGameObjects = ({ deltaTime, gameState, tank_context }) => {
  gameState.gameObjects.player.update({
    keys: gameState.keys,
    deltaTime,
  });

  // * Update the bullets
  gameState.gameObjects.bullets.forEach((bullet) => {
    bullet.update({ deltaTime });
  });
};

export const renderGameObjects = ({ deltaTime, gameState, tank_context }) => {
  gameState.gameObjects.player.draw();

  // * Render the bullets
  gameState.gameObjects.bullets.forEach((bullet) => {
    bullet.draw();
  });
};
