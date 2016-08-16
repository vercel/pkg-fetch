import chipo from 'child_process';

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
