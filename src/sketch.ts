import { Sketch } from 'canvas-sketch';
import PolyBool, { Polygon } from 'polybooljs';

type Point = [number, number];

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

const rotate = (x: number, y: number, theta: number, offset: Point): Point => [
  (x * Math.cos(theta) - y * Math.sin(theta)) + offset[0],
  (x * Math.sin(theta) + y * Math.cos(theta)) + offset[1],
];

const add = ([x, y]: Point, [dx, dy]: Point): Point => [x + dx, y + dy];

const rectangle = (x: number, y: number, w: number, h: number, deform = 0, r = 0): Polygon => {
  const cx = x + (w / 2);
  const cy = y + (h / 2);

  const x1 = (-w / 2);
  const x2 = (w / 2);
  const y1 = (-h / 2);
  const y2 = (h / 2);

  return [
    rotate(x1, y1, r, [cx, cy]),
    add(rotate(x2, y1, r, [cx, cy]), [deform + (0.05 * w), deform * (h / w)]),
    add(rotate(x2, y2, r, [cx, cy]), [deform, deform * (h / w)]),
    add(rotate(x1, y2, r, [cx, cy]), [deform, deform * (h / w) - (0.075 * h)]),
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
  '#0d0d0d',
  '#44A6A6',
  '#BF7839',
  '#BF4B21',
  '#8C2218',
  '#af4626',
  '#c35f28',
  '#bb572e',
  '#84af95',
  '#9b9b81',
  '#a48176',
] as const;

export const sketch: Sketch = ({ context }) => {
  const drawPolygon = (polygon: Polygon) => {
    context.beginPath();
    const [first, ...rest] = polygon;
    context.moveTo(first[0], first[1]);
    rest.forEach(([x, y]) => context.lineTo(x, y));
    context.closePath();
    context.fill();
  };

  const fill = (color: string) => context.fillStyle = color;

  return ({ context, width, height }) => {
    fill(colors[0]);
    context.fillRect(0, 0, width, height);

    const w = 0.4 * width;
    const h = w * 3 / 4;
    const x = 0.58 * width - (w / 2);
    const y = 0.67 * height - (h / 2);
    const d = w * 0.025;

    const deform = -w / 5;

    const rect1 = rectangle(x, y, w, h);
    const rect2 = rectangle(x - d, y - d, w, h, deform);
    const rect3 = rectangle(x - d*2, y - d*2, w, h, deform * 2);
    const rect4 = rectangle(x - d*3.5, y - d*3.5, w, h, deform * 2.45);
    const rectangles = [rect1, rect2, rect3, rect4];

    let colorIndex = 1;
    rectangles.forEach(rect => {
      fill(colors[colorIndex++]);
      drawPolygon(rect);
    });

    for (let i = rectangles.length - 1; i >= 0; i--) {
      const rectA = rectangles[i];
      for (let j = i + 1; j < rectangles.length; j++) {
        fill(colors[colorIndex++]);
        drawPolygon(intersect(rectA, rectangles[j]));
      }
    }
  };
};
