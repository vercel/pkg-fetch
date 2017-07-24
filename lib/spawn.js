import byline from 'byline';
import chip from 'child_process';
import fs from 'fs';
import { log } from './log.js';

const MAX_LINES = 20;
const DEBUG_THRESHOLDS = false;

function errorLines (lines) {
  return lines.slice(-MAX_LINES)
    .map((line) => line[1]).join('\n');
}

export function spawn (cmd, args, opts) {
  const child = chip.spawn(cmd, args, opts);
  const stdout = byline(child.stdout);
  const stderr = byline(child.stderr);
  const lines = [];

  let onData = function (data) {
    const time = (new Date()).getTime();
    lines.push([ time, data.toString() ]); // TODO chalk stdout/stderr?
    const { thresholds } = this; // eslint-disable-line no-invalid-this
    if (thresholds) {
      for (const key in thresholds) {
        if (data.indexOf(key) >= 0) {
          const p = thresholds[key];
          log.showProgress(p);
          if (DEBUG_THRESHOLDS) {
            lines.push([ time, '************' ]);
            lines.push([ time, p + ': ' + key ]);
            lines.push([ time, '************' ]);
          }
        }
      }
    }
  };

  const promise = new Promise((resolve, reject) => {
    child.on('error', (error) => {
      console.error(errorLines(lines)); // dont use `log` here
      reject(error);
    });
    child.on('close', (code) => {
      if (code) {
        console.error(errorLines(lines)); // dont use `log` here
        return reject(new Error(`${cmd} failed with code ${code}`));
      }
      resolve();
    });
  });

  onData = onData.bind(promise);
  if (stdout) stdout.on('data', onData);
  if (stderr) stderr.on('data', onData);

  promise.child = child;
  promise.lines = lines;
  return promise;
}

export function progress (promise, thresholds) {
  promise.thresholds = thresholds;
  const { child, lines } = promise;
  log.enableProgress(promise.child.spawnfile);
  log.showProgress(0);
  const start = (new Date()).getTime();
  child.on('close', () => {
    if (DEBUG_THRESHOLDS) {
      const finish = (new Date()).getTime();
      const content = lines.map((line) =>
        ((100 * (line[0] - start) / (finish - start)) | 0) + ': ' + line[1]
      ).join('\n');
      fs.writeFileSync(child.spawnfile + '.debug', content);
    }
    log.showProgress(100);
    log.disableProgress();
  });
}
