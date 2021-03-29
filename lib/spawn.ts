import byline from 'byline';
import chip from 'child_process';
import fs from 'fs';
import { log } from './log';
import getThresholds from './thresholds';

const MAX_LINES = 20;
const DEBUG_THRESHOLDS = false;

type OutputLine = [number, string];

function errorLines(lines: OutputLine[]) {
  return lines
    .slice(-MAX_LINES)
    .map((line) => line[1])
    .join('\n');
}

class ObservablePromise extends Promise<void> {
  thresholds?: ReturnType<typeof getThresholds>;

  child!: chip.ChildProcess;

  lines: OutputLine[] = [];
}

export function spawn(cmd: string, args: (string)[], opts: chip.SpawnOptions = {}) {
  const child = chip.spawn(cmd, args, opts);
  const stdout = child.stdout && byline(child.stdout);
  const stderr = child.stderr && byline(child.stderr);
  const lines: OutputLine[] = [];

  let onData = (data: string) => {
    const time = new Date().getTime();
    lines.push([time, data.toString()]); // TODO chalk stdout/stderr?
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { thresholds } = this as ObservablePromise;

    if (thresholds) {
      for (const key in thresholds) {
        if (data.indexOf(key) >= 0) {
          const p = thresholds[key as keyof typeof thresholds];
          
          if (p !== undefined) {
            log.showProgress(p);
          }

          if (DEBUG_THRESHOLDS) {
            lines.push([time, '************']);
            lines.push([time, `${p}: ${key}`]);
            lines.push([time, '************']);
          }
        }
      }
    }
  };

  const promise = new ObservablePromise((resolve, reject) => {
    child.on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error(errorLines(lines)); // dont use `log` here
      reject(error);
    });
    child.on('close', (code) => {
      if (code) {
        // eslint-disable-next-line no-console
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

export function progress(
  promise: ObservablePromise,
  thresholds: ReturnType<typeof getThresholds>
) {
  promise.thresholds = thresholds;
  const { child, lines } = promise;

  log.enableProgress(child.spawnfile);
  log.showProgress(0);

  const start = new Date().getTime();
  child.on('close', () => {
    if (DEBUG_THRESHOLDS) {
      const finish = new Date().getTime();
      const content = lines
        .map(
          (line) =>
            `${((100 * (line[0] - start)) / (finish - start)) | 0}: ${line[1]}`
        )
        .join('\n');

      fs.writeFileSync(`${child.spawnfile}.debug`, content);
    }

    log.showProgress(100);
    log.disableProgress();
  });
}
