import { Sketch } from 'canvas-sketch';

export const colors = [
  '#396B24',
  '#162a02',
  '#64D87E',

  '#22450F',

  '#7a9b59',
  '#20432F',
  '#487D5E',
  '#62AF7E',
];

export const sketch: Sketch = ({ context, width, height }) => {

  const rotatedRect = (color: string, r: number, x: number, y: number) => {
    context.save();

    context.translate(width * x, height * (1 - y));
    context.rotate(Math.PI * r);

    context.fillStyle = color;
    const w = width * 0.09;
    const h = w * 5;
    context.fillRect(-w / 2, -h / 2, w, h);

    context.restore();
  }

  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  return ({ context, width, height }) => {
    rotatedRect(colors[0], -0.07, 0.2, 0.45);
    rotatedRect(colors[1], -0.04, 0.26, 0.49);
    rotatedRect(colors[2], -0.065, 0.33, 0.46);

    rotatedRect(colors[4], -0.012, 0.56, 0.45);
    rotatedRect(colors[5], 0.025, 0.63, 0.51);
    rotatedRect(colors[6], -0.03, 0.72, 0.44);
    rotatedRect(colors[7], -0.02, 0.8, 0.49);

    rotatedRect(colors[3], 0.01, 0.45, 0.55);
  };
};
