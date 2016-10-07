import { mkdirp, remove } from 'fs-promise';
import { progress, spawn } from './spawn.js';
import { copyFile } from './copy-file.js';
import { log } from './log.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { tempPath } from './temp-path.js';
import thresholds from './thresholds.js';

const buildPath = tempPath();
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

async function gitClone () {
  log.info('Cloning Node.js repository from GitHub...');
  const args = [ 'clone', '--bare', '--progress', nodeRepo, 'node/.git' ];
  const promise = spawn('git', args, { cwd: buildPath });
  progress(promise, thresholds('clone'));
  await promise;
}

async function gitResetHard (nodeVersion) {
  log.info(`Checking out ${nodeVersion}`);
  const patches = patchesJson[nodeVersion];
  const commit = patches.commit || nodeVersion;
  const args = [ '--work-tree', '.', 'reset', '--hard', commit ];
  await spawn('git', args, { cwd: nodePath });
}

async function applyPatches (nodeVersion) {
  log.info('Applying patches');
  let patches = patchesJson[nodeVersion];
  patches = patches.patches || patches;
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
  // first of all v8_inspector introduces the use
  // of `prime_rehash_policy` symbol that requires
  // GLIBCXX_3.4.18 on some systems
  // also we don't support any kind of debugging
  // against packaged apps, hence v8_inspector is useless
  const major = nodeVersion.match(/^v?(\d+)/)[1] | 0;
  if (major >= 6) args.push('--without-inspector');
  // TODO same for windows?
  await spawn('./configure', args, { cwd: nodePath });
  const make = process.platform === 'freebsd' ? 'gmake' : 'make';
  const promise = spawn(make, [], { cwd: nodePath });
  progress(promise, thresholds('make', nodeVersion));
  await promise;
  return path.join(nodePath, 'out/Release/node');
}

async function compile (nodeVersion, targetArch) {
  log.info('Compiling Node.js from sources...');
  if (process.platform === 'win32') {
    return await compileOnWindows(nodeVersion, targetArch);
  } else {
    return await compileOnUnix(nodeVersion, targetArch);
  }
}

export default async function build (
  nodeVersion, targetArch, local
) {
  await remove(buildPath);
  await mkdirp(buildPath);
  await gitClone();
  await gitResetHard(nodeVersion);
  await applyPatches(nodeVersion);
  const output = await compile(nodeVersion, targetArch);
  await mkdirp(path.dirname(local));
  await copyFile(output, local);
  await remove(buildPath);
}
