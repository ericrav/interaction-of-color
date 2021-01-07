import canvasSketch from 'canvas-sketch';
import * as dat from 'dat.gui';

// @ts-ignore
import { settings } from './settings.ts';
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

addGUI(colors);

const devSettings = {
  ...settings,
  animate: true,
};

canvasSketch(sketch, devSettings);
