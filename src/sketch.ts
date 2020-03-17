import { Sketch } from 'canvas-sketch';

export const colors = [
  '#9169ca',
  '#3a215f',
  '#b088eb',
  '#2a585f',
  '#fad251',
];

export const sketch: Sketch = ({ context, width, height }) => {
  const center = () => context.translate(width * 0.5, height * 0.5);

  const rotatedRect = (color: string, x: number) => {
    context.save();
    const rotation = Math.PI * 0.92;
    context.fillStyle = color;
    center();
    context.translate(width * x, 0);
    context.rotate(rotation);
    const w = width * 0.25;
    const h = width * 0.75;
    context.fillRect(-w*0.5, -h*0.5, w, h);
    context.restore();
  }

  return ({ context, width, height }) => {
    context.fillStyle = colors[1];
    context.fillRect(0, 0, width, height*0.5);
    context.fillStyle = colors[2];
    context.fillRect(0, height*0.5, width, height*0.5);

    rotatedRect(colors[0], -0.2);
    rotatedRect(colors[0], 0.2);

    context.fillStyle = colors[3];
    context.fillRect(0, height*0.25, width, height*0.1);

    context.fillStyle = colors[4];
    context.fillRect(0, height*0.35, width, height*0.4);
  };
};
