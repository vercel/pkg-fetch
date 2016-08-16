import { mkdirp, remove } from 'fs-promise';
import { progress, spawn } from './spawn.js';
import { copyFile } from './copy-file.js';
import log from './log.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { tempPath } from './temp-path.js';

const windows = process.platform === 'win32';

const buildPath = tempPath();
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

const gitCloneThresholds = {
  '  0% ':  0, '  1% ':  1, '  5% ':  5, ' 10% ': 10, // eslint-disable-line key-spacing
  ' 20% ': 20, ' 40% ': 40, ' 60% ': 60, ' 80% ': 80
};

async function gitClone () {
  log.info('Cloning Node.js from GitHub');
  const args = [ 'clone', '--progress', nodeRepo, 'node' ];
  const promise = spawn('git', args, { cwd: buildPath });
  progress(promise.child, gitCloneThresholds);
  await promise;
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
