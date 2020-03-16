import canvasSketch, { Settings } from 'canvas-sketch';
import * as dat from 'dat.gui';

// @ts-ignore
import { sketch, colors } from './sketch.ts';

const copyToClipboard = (text: string) => {
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
};

const addGUI = (colors: string[] = []) => {
  const gui = new dat.GUI();
  colors.forEach((_, i) => gui.addColor(colors, String(i)));

  const copy = () => {
    copyToClipboard(colors.map(c => `  '${c}',`).join('\n'));
  };
  gui.add({ copy }, 'copy');
  return gui;
};

const settings: Settings = {
  dimensions: [2048, 2048],
  animate: true,
};

addGUI(colors);

canvasSketch(sketch, settings);
