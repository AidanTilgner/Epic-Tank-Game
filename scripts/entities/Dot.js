export class Dot {
  constructor({ x, y, value, context }) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.context = context;
  }

  draw() {
    this.context.fillStyle = "#2256f2";
    this.context.beginPath();
    // the size of the dot is the value of the dot multiplied by 10
    const size = this.value * 10;
    this.context.ellipse(this.x, this.y, size, size, 0, 0, 2 * Math.PI);
    this.context.fill();
  }
}

export const generateRandomDots = (context, dots, count) => {
  for (let i = 0; i < count; i++) {
    dots.add(
      new Dot({
        x: Math.floor(Math.random() * context.canvas.width),
        y: Math.floor(Math.random() * context.canvas.height),
        value: Math.floor(Math.random() * 3),
        context,
      })
    );
  }
  return dots;
};

export const drawExistingDots = (dots) => {
  dots.forEach((dot) => {
    dot.draw();
  });
};
