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
  '#633c7f',
  '#de82a2',
  '#d67a9e',
  '#ce7399',
  '#c56d95',
  '#b6669a',
  '#a7629f',
  '#9d5e96',
  '#ac6091',
  '#93598c',
  '#b6668a',
  '#a05b87',
  '#8c5585',
  '#be6a8c',
  '#aa5f81',
  '#96557f',
  '#7d4d77',
  '#c57091',
  '#ac6080',
  '#a05979',
  '#894e74',
  '#72466d',
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

  const fill = (color: string) => context.fillStyle = color;

  return ({ context, width, height }) => {
    fill(colors[0]);
    context.fillRect(0, 0, width, height);

    const w = 0.4 * width;
    const h = w * 3 / 4;
    const x = 0.58 * width - (w / 2);
    const y = 0.67 * height - (h / 2);

    const deform = -w / 9;

    const rect1 = rectangle(x, y, w, h);
    const rect2 = rectangle(x, y, w, h, deform);
    const rect3 = rectangle(x, y, w, h, deform * 2);
    const rect4 = rectangle(x, y, w, h, deform * 3);
    const rect5 = rectangle(x, y, w, h, deform * 4);
    const rect6 = rectangle(x, y, w, h, deform * 5);
    const rectangles = [rect1, rect2, rect3, rect4, rect5, rect6];

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
