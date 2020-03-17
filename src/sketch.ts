import { Sketch } from 'canvas-sketch';

export const colors = [
  '#c87272',
  '#4a2525',
  '#592626',
];

export const sketch: Sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width / 2, height);
    context.fillStyle = colors[1];
    context.fillRect(width / 2, 0, width / 2, height);
    context.fillStyle = colors[2];
    const w = width / 8;
    const h = w;
    const x = width * 0.25 - w / 2;
    const y = (height - h) / 2;
    context.fillRect(x, y, w, h);
    context.fillRect(x + width * 0.5, y, w, h);
  };
};
