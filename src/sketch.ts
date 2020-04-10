import { Sketch } from 'canvas-sketch';

export const colors = [
  '#af3a63',
  '#18285f',
  '#4e346b',
  '#933a69',
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
    const h1 = height * 0.6;
    const y2 = height * 0.75;
    const h2 = height * 0.1;
    const y3 = height * 0.9;

    // backgrounds
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width, h1);
    context.fillRect(0, y2, width / 2, h2);

    context.fillStyle = colors[1];
    context.fillRect(0, 0, width / 2, h1);
    context.fillRect(width / 2, y2, width / 2, h2);

    context.fillStyle = colors[3];
    context.fillRect(0, y3, width / 2, h2);

    context.fillStyle = colors[2];
    context.fillRect(width / 2, y3, width / 2, h2);

    // lines
    context.lineWidth = 0.016 * width;

    context.strokeStyle = colors[2];
    diagonal(0.25, 0.3, 0.5);
    hLine(0.1, 0.8, 0.4);

    context.strokeStyle = colors[3];
    diagonal(0.75, 0.3, 0.5);
    hLine(0.5, 0.8, 0.4);
  };
};
