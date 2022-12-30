import { drawExistingDots, generateRandomDots } from "./entities/Dot.js";
import { PlayerTank } from "./entities/PlayerTank.js";
import { initCanvas } from "./utils/canvas.js";
import { setUpControls } from "./utils/controls.js";
import { executeEveryNFrames } from "./utils/flow.js";

// * Game Setup Code
const { canvas: _, context } = initCanvas();

const gameState = {
  players: [
    new PlayerTank({
      context,
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      color: "red",
      properties: {
        speed: 5,
      },
    }),
  ],
  gamerate: 25,
  running: true,
  keys: setUpControls(),
  frame: 0,
  dots: new Set(),
};

export function runGameLoop() {
  if (gameState.running) {
    // clear the canvas

    gameState.players.forEach((player) => {
      player.updatePositionFromKeys(gameState.keys);
    });

    executeEveryNFrames(2, gameState.frame, () => {
      generateRandomDots(context, gameState.dots, 1);
      drawExistingDots(gameState.dots);
    });

    gameState.frame++;
    setTimeout(() => {
      runGameLoop();
    }, gameState.gamerate);
  }
}
runGameLoop();

export function stopGameLoop() {
  gameState.running = false;
}
