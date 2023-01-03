import { PlayerTank } from "../entities/PlayerTank.js";
import { spawnBullet } from "../entities/Bullet.js";
import { Blobber } from "../entities/enemies/Blobber.js";

export const initGameObjects = ({
  tank_context,
  bullet_context,
  enemy_context,
}) => {
  const gameObjects = {};
  const player = new PlayerTank({
    context: tank_context,
    x: 100,
    y: 100,
    color: "red",
    properties: {
      speed: 5,
      bullet_speed: 10,
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
  gameObjects.enemies = new Map();

  // * Spawn some enemies

  return gameObjects;
};

export function postInitSetup({ gameState }) {
  addEnemies({ gameState });
}

export function addEnemies({ gameState }) {
  for (let i = 0; i < 1; i++) {
    const enemy = new Blobber({
      context: gameState.contexts.enemy_context,
      x: Math.random() * 500,
      y: Math.random() * 500,
      color: "blue",
      properties: {
        speed: 5,
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
      gameState,
    });
    gameState.gameObjects.enemies.set(enemy.id, enemy);
  }
}

export const updateGameObjects = ({ deltaTime, gameState, tank_context }) => {
  gameState.gameObjects.player.update({
    keys: gameState.keys,
    deltaTime,
  });

  // * Update the bullets
  gameState.gameObjects.bullets.forEach((bullet) => {
    bullet.update({ deltaTime });
  });

  // * Update the enemies
  gameState.gameObjects.enemies.forEach((enemy) => {
    enemy.update({ deltaTime });
  });
};

export const renderGameObjects = ({ deltaTime, gameState, tank_context }) => {
  gameState.gameObjects.player.draw();

  // * Render the bullets
  gameState.gameObjects.bullets.forEach((bullet) => {
    bullet.draw();
  });

  // * Render the enemies
  gameState.gameObjects.enemies.forEach((enemy) => {
    enemy.draw();
  });
};
