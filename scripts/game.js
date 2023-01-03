import { initCanvas } from "./utils/canvas.js";
import { setUpControls } from "./utils/controls.js";
import {
  initGameObjects,
  renderGameObjects,
  updateGameObjects,
} from "./utils/gameObjects.js";

// * Game Setup Code
const { tank_canvas, tank_context, bullet_canvas, bullet_context } =
  initCanvas();

const gameState = {
  contexts: {
    tank_context,
    bullet_context,
  },
  gameObjects: initGameObjects({ tank_context, bullet_context }),
  running: true,
  keys: setUpControls(),
  frame: 0,
  lastFrameTime: Date.now(),
};

export function initGame() {
  renderGameObjects({ deltaTime: 0, gameState, tank_context });
}
initGame();

export function update() {
  if (gameState.running) {
    const currentTime = Date.now();
    const deltaTime = currentTime - gameState.lastFrameTime;
    gameState.lastFrameTime = currentTime;

    updateGameObjects({ deltaTime, gameState, tank_context });

    gameState.frame++;
    requestAnimationFrame(update);
  }
}
// update();

export function stopGameLoop() {
  gameState.running = false;
}

export function startGameLoop() {
  gameState.running = true;
  update();
}
