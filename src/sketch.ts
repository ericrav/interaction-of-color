import { Sketch } from 'canvas-sketch';

export const colors = [
  '#9890d4',
  '#9b6a6a',
  '#5c2b48',
  '#4c3f8c',
  '#7f4972',
  '#774d89',
];

export const sketch: Sketch = ({ context, width, height }) => {
  return ({ context, width, height }) => {
    // backgrounds
    context.fillStyle = colors[0];
    context.fillRect(width / 2, 0, width / 2, height);

    context.fillStyle = colors[1];
    context.fillRect(0, 0, width / 2, height);

    {
      context.fillStyle = colors[2];
      const w = width * 0.8;
      const h = w / 4;
      const x = (width - w) * 0.5;
      const y = (height - h) * 0.5;
      context.fillRect(x, y, w, h);
      context.fillStyle = colors[3];
      context.fillRect(x + w * 0.5, y, w * 0.5, h);
    }

    const s = width * 0.15;
    const y = (height / 2) - (s / 2);
    const lw = 16;

    {
      // right square
      context.fillStyle = colors[5];
      const x = (width * 0.8) - (s / 2);
      context.fillRect(x, y, s, s);

      context.beginPath();
      context.strokeStyle = colors[5];
      context.lineWidth = lw;
      const x1 = x + s - (lw / 2);
      const y1 = y;
      const x2 = x1 - (width * 0.75);
      const y2 = y1 - (height * 0.09);
      context.moveTo(x1, y1);
      context.lineTo(x1, y2);
      context.lineTo(x2, y2);
      context.stroke();
    }

    // right circle
    context.fillStyle = colors[4];
    drawCircle(context, width * 0.86, height * 0.66, height * 0.095);

    // left circle
    context.fillStyle = colors[5];
    drawCircle(context, width * 0.12, height * 0.33, height * 0.13);

    {
      // left square
      context.fillStyle = colors[4];
      const x = (width * 0.2) - (s / 2);
      context.fillRect(x, y, s, s);

      context.beginPath();
      context.strokeStyle = colors[4];
      context.lineWidth = lw;
      const x1 = x + s - (lw / 2);
      const y1 = y + s;
      const y2 = y1 + (height * 0.09);
      context.moveTo(x1, y1);
      context.lineTo(x1, y2);
      context.lineTo(x1 + (width * 0.75) - s, y2);
      context.stroke();
    }
  };
};

const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}
