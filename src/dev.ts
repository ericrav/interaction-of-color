import canvasSketch, { Settings } from 'canvas-sketch';
import * as dat from 'dat.gui';

// @ts-ignore
import { dimensions } from './config.ts';
// @ts-ignore
import { sketch, shapes } from './sketch.ts';

const copyToClipboard = (text: string) => {
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
};

const addGUI = () => {
  const gui = new dat.GUI();

  const copy = () => {
    copyToClipboard(JSON.stringify(shapes));
  };
  gui.add({ copy }, 'copy');
  return gui;
};

const settings: Settings = {
  dimensions,
  animate: true,
};

addGUI();

canvasSketch(sketch, settings);
