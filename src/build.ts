import { createCanvas } from 'canvas';
import canvasSketch, { Settings } from 'canvas-sketch';
import fs from 'fs';

import { sketch } from './sketch';

const size = 2048;

const canvas = createCanvas(size, size);

const settings: Settings = {
  canvas,
  dimensions: [size, size],
};

canvasSketch(sketch, settings).then(() => {
  const out = fs.createWriteStream('output.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('Done rendering'));
});
