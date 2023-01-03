export const initCanvas = () => {
  const TankCanvas = document.getElementById("tank-canvas");
  const tankContext = TankCanvas.getContext("2d");
  tankContext.resetTransform();
  tankContext.imageSmoothingEnabled = true;

  TankCanvas.width = window.innerWidth;
  TankCanvas.height = window.innerHeight;

  const BulletCanvas = document.getElementById("bullet-canvas");
  const bulletContext = BulletCanvas.getContext("2d");
  bulletContext.resetTransform();
  bulletContext.imageSmoothingEnabled = true;

  BulletCanvas.width = window.innerWidth;
  BulletCanvas.height = window.innerHeight;

  const EnemyCanvas = document.getElementById("enemy-canvas");
  const enemyContext = EnemyCanvas.getContext("2d");
  enemyContext.resetTransform();
  enemyContext.imageSmoothingEnabled = true;

  EnemyCanvas.width = window.innerWidth;
  EnemyCanvas.height = window.innerHeight;

  return {
    tank_canvas: TankCanvas,
    tank_context: tankContext,
    bullet_canvas: BulletCanvas,
    bullet_context: bulletContext,
    enemy_canvas: EnemyCanvas,
    enemy_context: enemyContext,
  };
};
