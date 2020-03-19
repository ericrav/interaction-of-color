import { Sketch } from 'canvas-sketch';

interface Shape {
  x: number;
  y: number;
  r: number;
  c: number;
  s: number;
  d: number;
}

export const shapes: Shape[] = require('./data.json');

const color = (shade: number) => {
  const v = Math.floor(shade * 256);
  return `rgb(${v},${v},${v})`;
};

const newShape = (): Shape => ({
  x: 0,
  y: 0,
  r: Math.random() * 2,
  c: Math.random(),
  s: Math.random() * 0.2,
  d: Math.random() * 0.4,
});

export const sketch: Sketch = ({
  canvas,
  context,
  width,
  height,
  styleWidth,
  styleHeight,
}) => {
  let shape: Shape;

  if (process.env.NODE_ENV !== 'production') {
    canvas.style.cursor = 'none';

    shape = newShape();
    const setShapePos = (e: MouseEvent) => {
      const x = e.offsetX / styleWidth - 0.5;
      const y = e.offsetY / styleHeight - 0.5;
      shape.x = x;
      shape.y = y;
    };

    document.addEventListener('keydown', ({ key }) => {
      if (key === 'n') {
        const { x, y } = shape;
        shape = newShape();
        shape.x = x;
        shape.y = y;
      }
    });
    canvas.addEventListener('mousemove', setShapePos);

    canvas.addEventListener('click', e => {
      shapes.push(shape);
      shape = newShape();
      setShapePos(e);
    });
  }

  const center = () => context.translate(width * 0.5, height * 0.5);

  const drawShape = (s: Shape) => {
    context.save();
    const rotation = Math.PI * s.r;
    context.fillStyle = color(s.c);
    center();
    context.translate(width * s.x, height * s.y);
    context.rotate(rotation);
    const min = width * 0.05;
    const w = min + (width * 0.05 * s.s)
    const h = w * (1 + s.d);
    context.fillRect(-w * 0.5, -h * 0.5, w, h);
    context.restore();
  };

  const midGray = color(0.5);
  const frame = () => {
    context.save();
    const s = width * 0.15;
    context.lineWidth = s;
    context.strokeStyle = midGray;
    context.strokeRect(0, 0, width, height);

    context.lineWidth = s / 2;
    context.strokeRect(0, height / 2, width, 0);
    context.strokeRect(width / 2, 0, 0, height);
    context.restore();
  };

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    shapes.forEach(drawShape);
    if (shape) {
      drawShape(shape);
    }

    frame();
  };
};
