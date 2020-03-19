declare module 'canvas-sketch' {
  export interface Props {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    styleWidth: number;
    styleHeight: number;
    time: number;
    deltaTime: number;
    playhead: number;
    frame: number;
    fps: number;
  }

  export interface Settings {
    canvas?: import('canvas').Canvas;
    duration?: number;
    animate?: boolean;
    dimensions?: [number, number];
    units?: 'in' | 'cm' | 'px' | 'ft' | 'm' | 'mm';
    bleed?: number;
  }

  export type Sketch = (initialProps: Props) => (renderProps: Props) => void;

  const canvasSketch: (sketch: Sketch, settings: Settings) => Promise<void>;
  export default canvasSketch;
}
