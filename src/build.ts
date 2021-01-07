import { createCanvas } from 'canvas';
import canvasSketch, { Settings } from 'canvas-sketch';
import fs from 'fs';

import { settings } from './settings';
import { dimensions } from './config';
import { sketch } from './sketch';
import { performTweet } from './tweet';

const canvas = createCanvas(...dimensions);

const buildSettings: Settings = {
  ...settings,
  canvas,
};

canvasSketch(sketch, buildSettings).then(() => {
  const out = fs.createWriteStream('output.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => {
    console.log('Done rendering');
    performTweet().catch((e) => {
      console.error('Problem tweeting', JSON.stringify(e));
      process.exit(1);
    });
  });
});
