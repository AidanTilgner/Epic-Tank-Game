export const initCanvas = () => {
  const GameCanvas = document.getElementById("game-canvas");
  const context = GameCanvas.getContext("2d");
  context.resetTransform();
  context.imageSmoothingEnabled = true;

  GameCanvas.setAttribute("width", window.innerWidth);
  GameCanvas.height = window.innerHeight;

  // context.scale(2, 2);

  return { canvas: GameCanvas, context };
};
