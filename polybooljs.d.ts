declare module 'polybooljs' {
  type Point = [number, number];

  export type Polygon = Point[];

  interface PolygonObj {
    regions: Polygon[];
  }

  type Operation = (polygon1: PolygonObj, polygon2: PolygonObj) => PolygonObj;

  const PolyBool: {
    union: Operation;
    intersect: Operation;
    difference: Operation;
    differenceRev: Operation;
    xor: Operation;
  };

  export default PolyBool;
}
