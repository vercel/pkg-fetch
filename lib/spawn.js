import chipo from 'child_process';
import log from './log.js';

export function spawn (cmd, args, opts) {
  const child = chipo.spawn(cmd, args, opts);
  const promise = new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', function (code) {
      if (code) return reject(new Error(`${cmd} failed with code ${code}`));
      resolve();
    });
  });
  promise.child = child;
  return promise;
}

export function progress (child, thresholds) {
  const gauge = log.newItem('', 100);
  gauge.enableProgress();
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => {
    for (const key in thresholds) {
      if (data.indexOf(key) >= 0) {
        const p = thresholds[key];
        gauge.name = p + '%';
        gauge.completeWork(p - gauge.workDone);
      }
    }
  });
  child.on('close', () => {
    gauge.disableProgress();
  });
}
