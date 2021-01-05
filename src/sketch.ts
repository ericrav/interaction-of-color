import { Sketch } from 'canvas-sketch';

export const colors = [
  '#471264',
  '#f26d51',
  '#894b65',
  '#ac5858',
];

export const sketch: Sketch = ({ context, width, height }) => {
  return ({ context, width, height }) => {
    // backgrounds
    const gradient = context.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    const s = height * 0.18;
    const y = (height - s) * 0.5;

    {
      const w = width * 0.4;
      const h = s;
      const x = (width - w) * 0.5;
      context.fillStyle = 'white';
      context.fillRect(x, y, w, h);

      const gap = 16;
      const w2 = w - gap * 2;
      const h2 = (h - gap * 3) * 0.5;
      context.fillStyle = colors[2];
      context.fillRect(x + gap, y + gap, w2, h2);
      context.fillStyle = colors[3];
      context.fillRect(x + gap, y + h2 + gap * 2, w2, h2);
    }

    {
      context.fillStyle = colors[2];
      context.fillRect(width * 0.1, y, s, s);
      context.fillStyle = colors[3];
      context.fillRect(width * 0.9 - s, y, s, s);
    }
  };
};

const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};
