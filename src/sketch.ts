import { Sketch } from 'canvas-sketch';
import PolyBool, { Polygon } from 'polybooljs';

const intersect = (poly1: Polygon, poly2: Polygon): Polygon => (
  PolyBool.intersect({ regions: [poly1] }, { regions: [poly2] }).regions[0]
);

const equilateralTriangle = (x: number, y: number, size: number): Polygon => {
  const h = size * (Math.sqrt(3) / 2);

  return [
    [x, y],
    [x - (size / 2), y + h],
    [x + (size / 2), y + h],
  ];
};

const rotate = (x: number, y: number, theta: number, offset: [number, number]): [number, number] => [
  (x * Math.cos(theta) - y * Math.sin(theta)) + offset[0],
  (x * Math.sin(theta) + y * Math.cos(theta)) + offset[1],
];

const rectangle = (x: number, y: number, w: number, h: number, r = 0): Polygon => {
  const cx = x + (w / 2);
  const cy = y + (h / 2);

  const x1 = (-w / 2);
  const x2 = (w / 2);
  const y1 = (-h / 2);
  const y2 = (h / 2);

  return [
    rotate(x1, y1, r, [cx, cy]),
    rotate(x2, y1, r, [cx, cy]),
    rotate(x2, y2, r, [cx, cy]),
    rotate(x1, y2, r, [cx, cy]),
  ];
};

const circle = (x: number, y: number, r: number): Polygon => {
  const points = 60;
  return new Array(points).fill(0).map((_, i) => {
    const angle = (i / points) * Math.PI * 2;
    return [x + Math.cos(angle) * r, y + Math.sin(angle) * r];
  });
}

export const colors = [
  '#0c245c',
  '#679cd7',
  '#1a7843',
  '#369864',
  '#4381c8',
  '#c2c86c',
  '#6fb19e',
  '#b9596f',
  '#17859d',
  '#79779d',
  '#c2c86c',
  '#5a36cd',
  '#5a6ab3',
  '#354ec3',
  '#bb6846',
  '#6457c5',
  '#51a07f',
  '#d77a7a',
  '#c5937e',
];

export const sketch: Sketch = ({ context }) => {
  const drawPolygon = (polygon: Polygon) => {
    context.beginPath();
    const [first, ...rest] = polygon;
    context.moveTo(first[0], first[1]);
    rest.forEach(([x, y]) => context.lineTo(x, y));
    context.closePath();
    context.fill();
  };

  return ({ context, width, height }) => {
    const fill = (color: string) => context.fillStyle = color;
    fill(colors[0]);
    context.fillRect(0, 0, width, height);

    {
      // main triangles
      const size = 0.3 * width;
      const x1 = 0.45 * width;
      const y1 = 0.1 * height;
      const triangle1 = equilateralTriangle(x1, y1, size);

      const x2 = x1 + 0.1 * width;
      const y2 = y1 + size * 0.2;
      const triangle2 = equilateralTriangle(x2, y2, size);

      fill(colors[1]);
      drawPolygon(triangle1);

      fill(colors[2]);
      drawPolygon(triangle2);

      fill(colors[3]);
      const overlap = intersect(triangle1, triangle2);
      drawPolygon(overlap);
    }

    context.scale(width, width);
    context.translate(0, 0.78 * (height / width));
    context.translate(0.08, 0);

    let i = 3;
    const nextColor = () => fill(colors[++i]);

    const drawPair = (polygon1: Polygon, polygon2: Polygon) => {
      nextColor();
      drawPolygon(polygon1);
      nextColor();
      drawPolygon(polygon2);
      nextColor();
      const overlap = intersect(polygon1, polygon2);
      drawPolygon(overlap);
      context.translate(0.18, 0);
    };

    const s = 0.06;

    drawPair(
      circle(0.035, 0.0575, 0.0375),
      circle(0.055, 0.035, 0.04),
    );

    drawPair(
      equilateralTriangle(0.03, 0, 0.08),
      circle(0.065, 0.065, 0.035),
    );

    drawPair(
      rectangle(0, 0.0165, 0.085, 0.055),
      rectangle(0.035, 0.02, 0.0875, 0.0575, Math.PI * 0.325),
    );

    drawPair(
      rectangle(0, 0, s, s),
      rectangle(s / 2, s / 2, s, s),
    );

    drawPair(
      circle(0.035, 0.035, 0.04),
      rectangle(0.025, 0.03, 0.08, 0.05, Math.PI * -0.095),
    );
  };
};
