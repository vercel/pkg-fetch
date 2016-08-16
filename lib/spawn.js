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
  log.enableProgress();
  log.showProgress('', 0);
  const onData = (data) => {
    for (const key in thresholds) {
      if (data.indexOf(key) >= 0) {
        const p = thresholds[key];
        log.showProgress(p + '%', p / 100);
      }
    }
  };
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', onData);
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', onData);
  child.on('close', () => {
    log.disableProgress();
  });
}
