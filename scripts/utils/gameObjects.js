import { PlayerTank } from "../entities/PlayerTank.js";
import { executeEveryNFrames } from "../utils/flow.js";
import { generateRandomDots, drawExistingDots } from "../entities/Dot.js";

export const initGameObjects = ({ context }) => {
  const gameObjects = {};
  const player = new PlayerTank({
    context,
    x: 100,
    y: 100,
    color: "red",
    properties: {
      speed: 5,
    },
  });

  gameObjects.player = player;

  gameObjects.dots = new Set();

  return gameObjects;
};

export const updateGameObjects = ({ deltaTime, gameState, context }) => {
  gameState.gameObjects.player.update({
    keys: gameState.keys,
    deltaTime,
  });
};

export const renderGameObjects = ({ deltaTime, gameState, context }) => {
  gameState.gameObjects.player.draw();
};
