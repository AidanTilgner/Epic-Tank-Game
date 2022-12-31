export const initCanvas = () => {
  const TankCanvas = document.getElementById("tank-canvas");
  const context = TankCanvas.getContext("2d");
  context.resetTransform();
  context.imageSmoothingEnabled = true;

  TankCanvas.setAttribute("width", window.innerWidth);
  TankCanvas.height = window.innerHeight;

  // context.scale(2, 2);

  return { canvas: TankCanvas, context };
};
