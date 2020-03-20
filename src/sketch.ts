import { Sketch } from 'canvas-sketch';

export const colors = [
  '#c34f43',
  '#8e1616',
  '#A32F37',
  '#de2616',
  '#F73800',
  '#b11200',
  '#d2192a',
  '#fc4353',
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
    rotatedRect(colors[0], 0.02, 0.2, 0.46);
    rotatedRect(colors[1], -0.015, 0.3, 0.44);
    rotatedRect(colors[2], 0.023, 0.36, 0.47);
    rotatedRect(colors[4], 0.01, 0.57, 0.48);

    rotatedRect(colors[3], -0.02, 0.45, 0.58);

    rotatedRect(colors[5], 0.02, 0.64, 0.5);
    rotatedRect(colors[6], -0.015, 0.72, 0.44);
    rotatedRect(colors[7], -0.01, 0.8, 0.49);
  };
};
