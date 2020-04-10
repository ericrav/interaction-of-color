import { Sketch } from 'canvas-sketch';

export const colors = [
  '#081e08',
  '#d4e1eb',
  '#79beb1',
  '#1a6650',
];

export const sketch: Sketch = ({ context, width, height }) => {
  const angle = (height / width) * -0.25 * Math.PI;

  const diagonal = (x: number, y: number, w: number) => {
    const dx = w * 0.5 * Math.cos(angle);
    const dy = w * 0.5 * Math.sin(angle);
    const x1 = ((x - dx) * width);
    const y1 = ((y - dy) * height);
    const x2 = ((x + dx) * width);
    const y2 = ((y + dy) * height);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  const hLine = (x: number, y: number, w: number) => {
    context.beginPath();
    context.moveTo(x * width, y * height);
    context.lineTo((x + w) * width, y * height);
    context.stroke();
  };

  return ({ context, width, height }) => {
    // backgrounds
    context.fillStyle = colors[0];
    context.fillRect(width / 2, 0, width / 2, height);

    context.fillStyle = colors[1];
    context.fillRect(0, 0, width / 2, height);

    // lines
    context.lineWidth = 0.016 * width;

    context.strokeStyle = colors[2];
    diagonal(0.25, 0.3, 0.5);
    diagonal(0.49, 0.85, 0.25);

    context.strokeStyle = colors[3];
    diagonal(0.75, 0.3, 0.5);
    diagonal(0.51, 0.85, 0.25);
  };
};
