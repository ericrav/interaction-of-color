import { Sketch } from 'canvas-sketch';

export const colors = [
  '#042146',
  '#6792dc',
  '#36618e',
  '#1d1959',
  '#4868fc',
  '#0F2DDC',
  '#86add2',
  '#183669',
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
    rotatedRect(colors[0], 0.01, 0.2, 0.44);
    rotatedRect(colors[1], 0.02, 0.28, 0.46);
    rotatedRect(colors[2], -0.01, 0.36, 0.43);
    rotatedRect(colors[3], 0.025, 0.44, 0.46);
    rotatedRect(colors[4], -0.03, 0.52, 0.43);

    rotatedRect(colors[5], 0.02, 0.62, 0.55);

    rotatedRect(colors[7], -0.01, 0.8, 0.46);
    rotatedRect(colors[6], 0.03, 0.73, 0.43);
  };
};
