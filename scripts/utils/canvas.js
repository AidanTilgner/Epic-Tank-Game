export const initCanvas = () => {
  const GameCanvas = document.getElementById("game-canvas");
  const context = GameCanvas.getContext("2d");
  context.resetTransform();

  GameCanvas.setAttribute("width", window.innerWidth * 10);
  GameCanvas.height = window.innerHeight * 10;

  context.scale(5, 5);

  return { canvas: GameCanvas, context };
};
