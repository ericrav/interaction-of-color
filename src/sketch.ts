import { Sketch } from 'canvas-sketch';

export const colors = [
  '#ac2525',
  '#e35b5b',
  '#be3d3d',
  '#7a93cf',
  '#302b89',
];

export const sketch: Sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width / 2, height);
    context.fillStyle = colors[1];
    context.fillRect(width / 2, 0, width / 2, height);
    context.fillStyle = colors[2];
    const h = height / 8;
    const w = h;
    context.fillRect(width * 0.25, height * 0.5 - h / 2, width * 0.5, h);
    context.fillStyle = colors[3];
    context.fillRect(width / 2, 0, w, height);
    context.fillStyle = colors[4];
    context.fillRect(width / 2 - w, 0, w, height);
  };
};
