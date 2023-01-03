export const initCanvas = () => {
  const TankCanvas = document.getElementById("tank-canvas");
  const tankContext = TankCanvas.getContext("2d");
  tankContext.resetTransform();
  tankContext.imageSmoothingEnabled = true;

  TankCanvas.setAttribute("width", window.innerWidth);
  TankCanvas.height = window.innerHeight;

  const BulletCanvas = document.getElementById("bullet-canvas");
  const bulletContext = BulletCanvas.getContext("2d");
  bulletContext.resetTransform();
  bulletContext.imageSmoothingEnabled = true;

  BulletCanvas.setAttribute("width", window.innerWidth);
  BulletCanvas.height = window.innerHeight;

  // tankContext.scale(2, 2);

  return {
    tank_canvas: TankCanvas,
    tank_context: tankContext,
    bullet_canvas: BulletCanvas,
    bullet_context: bulletContext,
  };
};
