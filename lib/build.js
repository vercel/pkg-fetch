import { copyFile } from './copy-file.js';
import mkdirp from 'mkdirp-promise';
import patchesJson from '../patches/patches.json';
import path from 'path';
import rimraf from 'rimraf-promise';
import { spawn } from './spawn.js';

const platform = process.platform;
const windows = platform === 'win32';
const buildPath = path.resolve(__dirname, '../temp');
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');

async function compileOnWindows (target) {
  const args = [];
  args.push('/c', 'vcbuild.bat', target, 'nosign');
  await spawn('cmd', args,
    { stdio: 'inherit', cwd: nodePath });
  return path.join(nodePath, 'Release/node.exe');
}

async function compileOnUnix (target) {
  const args = [];
  const cpu = { x86: 'ia32', x64: 'x64',
    armv6: 'arm', armv7: 'arm' }[target];
  args.push('--dest-cpu', cpu);
  await spawn('./configure', args,
    { stdio: 'inherit', cwd: nodePath });
  await spawn('make', [],
    { stdio: 'inherit', cwd: nodePath });
  return path.join(nodePath, 'out/Release/node');
}

export default async function build (opts) {
  const { copyDest, nodeVersion, target } = opts;
  await rimraf(buildPath);
  await mkdirp(buildPath);

  await spawn('git',
    [ 'clone', 'https://github.com/nodejs/node', 'node' ],
    { stdio: 'inherit', cwd: buildPath });

  await spawn('git',
    [ 'reset', '--hard', nodeVersion ],
    { stdio: 'inherit', cwd: nodePath });

  const patches = patchesJson[nodeVersion];
  for (const patch of patches) {
    const patchPath = path.join(patchesPath, patch);
    await spawn('patch',
      [ '-p1', '-i', patchPath ],
      { stdio: 'inherit', cwd: nodePath });
  }

  let output;
  if (windows) {
    output = await compileOnWindows(target);
  } else {
    output = await compileOnUnix(target);
  }

  await mkdirp(path.dirname(copyDest));
  await copyFile(output, copyDest);
  await rimraf(buildPath);
}
