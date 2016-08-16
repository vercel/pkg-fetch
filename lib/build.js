import { mkdirp, remove } from 'fs-promise';
import { copyFile } from './copy-file.js';
import log from './log.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { spawn } from './spawn.js';
import { tempPath } from './temp-path.js';

const windows = process.platform === 'win32';

const buildPath = tempPath();
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

async function gitClone () {
  const args = [ 'clone', '--progress', nodeRepo, 'node' ];
  const promise = spawn('git', args, { cwd: buildPath });
  const { child } = promise;

  const gauge = log.newItem('', 100);
  gauge.enableProgress();
  gauge.info('Cloning Node.js from GitHub');
  try {
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (data) => {
      if (!(/^Receiving objects/.test(data))) return;
      const d = data.indexOf('%');
      const p = data.slice(d - 3, d) | 0;
      gauge.name = p + '%';
      gauge.completeWork(p - gauge.workDone);
    });
    await promise;
  } finally {
    gauge.disableProgress();
  }
}

async function compileOnWindows (targetArch) {
  const args = [];
  args.push('/c', 'vcbuild.bat', targetArch, 'nosign');
  await spawn('cmd', args,
    { stdio: 'inherit', cwd: nodePath });
  return path.join(nodePath, 'Release/node.exe');
}

async function compileOnUnix (targetArch) {
  const args = [];
  const cpu = { x86: 'ia32', x64: 'x64',
    armv6: 'arm', armv7: 'arm' }[targetArch];
  args.push('--dest-cpu', cpu);
  await spawn('./configure', args,
    { stdio: 'inherit', cwd: nodePath });
  await spawn('make', [],
    { stdio: 'inherit', cwd: nodePath });
  return path.join(nodePath, 'out/Release/node');
}

export default async function build (
  nodeVersion, targetArch, local
) {
  await remove(buildPath);
  await mkdirp(buildPath);
  await gitClone();

  log.info(`Resetting to ${nodeVersion}`);
  await spawn('git',
    [ 'reset', '--hard', nodeVersion ],
    { stdio: 'inherit', cwd: nodePath });

  log.info('Applying patches');
  const patches = patchesJson[nodeVersion];
  for (const patch of patches) {
    const patchPath = path.join(patchesPath, patch);
    await spawn('patch',
      [ '-p1', '-i', patchPath ],
      { stdio: 'inherit', cwd: nodePath });
  }

  let output;
  if (windows) {
    output = await compileOnWindows(targetArch);
  } else {
    output = await compileOnUnix(targetArch);
  }

  await mkdirp(path.dirname(local));
  await copyFile(output, local);
  await remove(buildPath);
}
