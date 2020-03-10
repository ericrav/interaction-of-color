import { Sketch } from 'canvas-sketch';

export const colors = [
  '#000000',
  '#000000',
  '#000000',
];

export const sketch: Sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width, height);
  };
};
