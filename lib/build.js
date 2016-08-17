import { mkdirp, remove } from 'fs-promise';
import { progress, spawn } from './spawn.js';
import { copyFile } from './copy-file.js';
import log from './log.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { tempPath } from './temp-path.js';
import thresholds from './thresholds.js';

const windows = process.platform === 'win32';

const buildPath = tempPath();
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

async function gitClone () {
  log.info('Cloning Node.js from GitHub');
  const args = [ 'clone', '--bare', '--progress', nodeRepo, 'node/.git' ];
  const promise = spawn('git', args, { cwd: buildPath });
  progress(promise, thresholds('clone'));
  await promise;
}

async function gitResetHard (nodeVersion) {
  log.info(`Resetting to ${nodeVersion}`);
  const args = [ '--work-tree', '.', 'reset', '--hard', nodeVersion ];
  await spawn('git', args, { cwd: nodePath });
}

async function applyPatches (nodeVersion) {
  log.info('Applying patches');
  const patches = patchesJson[nodeVersion];
  for (const patch of patches) {
    const patchPath = path.join(patchesPath, patch);
    const args = [ '-p1', '-i', patchPath ];
    await spawn('patch', args, { cwd: nodePath });
  }
}

async function compileOnWindows (nodeVersion, targetArch) {
  const args = [];
  args.push('/c', 'vcbuild.bat', targetArch, 'nosign');
  const promise = spawn('cmd', args, { cwd: nodePath });
  progress(promise, thresholds('vcbuild', nodeVersion));
  await promise;
  return path.join(nodePath, 'Release/node.exe');
}

async function compileOnUnix (nodeVersion, targetArch) {
  const args = [];
  const cpu = { x86: 'ia32', x64: 'x64',
    armv6: 'arm', armv7: 'arm' }[targetArch];
  args.push('--dest-cpu', cpu);
  await spawn('./configure', args, { cwd: nodePath });
  const promise = spawn('make', [], { cwd: nodePath });
  progress(promise, thresholds('make', nodeVersion));
  await promise;
  return path.join(nodePath, 'out/Release/node');
}

export default async function build (
  nodeVersion, targetArch, local
) {
  await remove(buildPath);
  await mkdirp(buildPath);
  await gitClone();
  await gitResetHard(nodeVersion);
  await applyPatches(nodeVersion);

  log.info('Compiling Node.js sources');
  let output;
  if (windows) {
    output = await compileOnWindows(nodeVersion, targetArch);
  } else {
    output = await compileOnUnix(nodeVersion, targetArch);
  }

  await mkdirp(path.dirname(local));
  await copyFile(output, local);
  await remove(buildPath);
}
