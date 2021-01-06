import { Sketch } from 'canvas-sketch';

export const colors = [
  '#be5757',
  '#5a754c',
  '#5f423e',
];

export const sketch: Sketch = ({ context, width, height }) => {
  const rect = (x: number, y: number, size: number, aspectRatio: number) => {
    context.fillRect(x * width, y * height, size * width, size * width / aspectRatio);
  };

  return ({ context, width, height }) => {
    // backgrounds
    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);
    const fixedColor1 = '#D66E67';
    const fixedColor2 = '#5D835D';

    {
      // example 1
      const x1 = 0.02 * width;
      const x2 = x1 + 0.16 * width;
      const y1 = 0.06 * height;
      const y2 = y1 + 0.2 * height;
      const w = 0.3 * width;
      const h = w / (16 / 9);

      context.fillStyle = fixedColor1;
      context.fillRect(x1, y1, w, h);
      context.fillStyle = fixedColor2;
      context.fillRect(x2, y2, w, h);

      // overlapping region
      context.fillStyle = colors[0];
      context.fillRect(x2, y2, w - x2 + x1, h - y2 + y1);
    }

    {
      // example 2
      const x1 = 0.65 * width;
      const x2 = x1 - 0.06 * width;
      const y1 = 0.18 * height;
      const y2 = y1 + 0.17 * height;
      const w = 0.3 * width;
      const h = w / (16 / 9);

      context.fillStyle = fixedColor1;
      context.fillRect(x1, y1, w, h);
      context.fillStyle = fixedColor2;
      context.fillRect(x2, y2, w, h);

      // overlapping region
      context.fillStyle = colors[1];
      context.fillRect(x1, y2, w - x1 + x2, h - y2 + y1);
    }

    {
      // example 3
      const x1 = 0.1 * width;
      const x2 = x1 + 0.06 * width;
      const y1 = 0.72 * height;
      const y2 = y1 + 0.09 * height;
      const w = 0.7 * width;
      const h = 0.15 * height;

      context.fillStyle = fixedColor1;
      context.fillRect(x1, y1, w, h);
      context.fillStyle = fixedColor2;
      context.fillRect(x2, y2, w, h);

      // overlapping region
      context.fillStyle = colors[2];
      context.fillRect(x2, y2, w - x2 + x1, h - y2 + y1);
    }
  };
};

const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};
