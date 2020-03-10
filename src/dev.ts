import canvasSketch, { Settings } from 'canvas-sketch';
import * as dat from 'dat.gui';

// @ts-ignore
import { sketch, colors } from './sketch.ts';

const addGUI = (colors: string[] = []) => {
  const gui = new dat.GUI();
  colors.forEach((_, i) => gui.addColor(colors, String(i)));
  return gui;
};

const settings: Settings = {
  dimensions: [2048, 2048],
  animate: true,
};

addGUI(colors);

canvasSketch(sketch, settings);
