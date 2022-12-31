export const initCanvas = () => {
  const TankCanvas = document.getElementById("tank-canvas");
  const BulletCanvas = document.getElementById("bullet-canvas");
  const tankContext = TankCanvas.getContext("2d");
  tankContext.resetTransform();
  tankContext.imageSmoothingEnabled = true;

  TankCanvas.setAttribute("width", window.innerWidth);
  TankCanvas.height = window.innerHeight;

  // tankContext.scale(2, 2);

  return { tank_canvas: TankCanvas, tank_context: tankContext };
};
