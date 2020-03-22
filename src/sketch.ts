import { Sketch } from 'canvas-sketch';

export const colors = [
  '#1a9687',
  '#3d0082',
  '#11487a',
];

export const sketch: Sketch = ({ context, width, height }) => {
  const circle = (x: number, r: number) => {
    const cx = x * width;
    const cy = 0.5 * height;
    context.beginPath();
    context.arc(cx, cy, r * width, 0, 2 * Math.PI);
    context.stroke();
  };

  const hLine = (x: number, y: number, w: number) => {
    context.moveTo(x * width, y * height);
    context.lineTo((x + w) * width, y * height);
    context.stroke();
  };

  return ({ context, width, height }) => {
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width, height);

    context.fillStyle = colors[1];
    context.fillRect(0, 0, width / 2, height);

    context.lineWidth = 0.008 * width;
    context.strokeStyle = colors[2];

    const radius = 0.18;
    circle(0.25, radius);
    circle(0.75, radius);
    const x = 0.25 + radius;
    const w = 0.5 - radius * 2;
    hLine(x, 0.5, w);
  };
};
