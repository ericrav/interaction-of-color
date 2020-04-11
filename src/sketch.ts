import { Sketch } from 'canvas-sketch';

export const colors = [
  '#b1851c',
  '#120a37',
  '#082a34',
  '#656931',
];

export const sketch: Sketch = ({ context, width, height }) => {
  return ({ context, width, height }) => {
    // backgrounds
    context.fillStyle = colors[0];
    context.fillRect(width / 2, 0, width / 2, height);

    context.fillStyle = colors[1];
    context.fillRect(0, 0, width / 2, height);

    const s = width * 0.15;
    const y = (height / 2) - (s / 2);

    context.fillStyle = colors[2];
    context.fillRect((width * 0.25) - (s / 2), y, s, s);

    context.fillStyle = colors[3];
    context.fillRect((width * 0.75) - (s / 2), y, s, s);

    const s2 = width * 0.03;
    const y2 = height - s2;

    context.fillStyle = colors[3];
    context.fillRect((width * 0.5) - s2, y2, s2, s2);

    context.fillStyle = colors[2];
    context.fillRect((width * 0.5), y2, s2, s2);
  };
};
