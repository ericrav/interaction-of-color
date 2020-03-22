import { Sketch } from 'canvas-sketch';

export const colors = [
  '#fa9e6c',
  '#e66002',
  '#f07838',
];

export const sketch: Sketch = ({ context, width, height }) => {

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

    hLine(0.05, 0.2, 0.4);
    hLine(0.55, 0.2, 0.4);

    hLine(0.05, 0.4, 0.2);
    hLine(0.65, 0.4, 0.3);

    hLine(0.05, 0.5, 0.9);

    hLine(0.05, 0.6, 0.3);
    hLine(0.75, 0.6, 0.2);

    hLine(0.05, 0.8, 0.1);
    hLine(0.85, 0.8, 0.1);
  };
};
