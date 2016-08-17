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
  'ving objects:   0%':  0, 'ving objects:   1%':  1, 'ving objects:   5%':  5, // eslint-disable-line key-spacing
  'ving objects:  10%': 10, 'ving objects:  20%': 20, 'ving objects:  40%': 40,
  'ving objects:  61%': 60, 'ving objects:  81%': 80,       'deltas:   0%': 98
};

// TODO try cloning bare repo

async function gitClone () {
  log.info('Cloning Node.js from GitHub');
  const args = [ 'clone', '--progress', nodeRepo, 'node' ];
  const promise = spawn('git', args, { cwd: buildPath });
  progress(promise.child, gitCloneThresholds);
  await promise;
}

async function gitResetHard (nodeVersion) {
  log.info(`Resetting to ${nodeVersion}`);
  const args = [ 'reset', '--hard', nodeVersion ];
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

const windowsThresholds = {
  'http_parser.vcxproj ->': 1, 'openssl.vcxproj ->': 3,
  'icudata.vcxproj ->': 13, 'hydrogen-representation-changes.cc': 20,
  'interface-descriptors-x64.cc': 30, 'v8_base_0.vcxproj ->': 44,
  'build\\Release\\mksnapshot.lib': 57, 'mksnapshot.vcxproj ->': 69,
  'node\\Release\\node.exp': 85, 'cctest.vcxproj ->': 97
};

async function compileOnWindows (targetArch) {
  const args = [];
  args.push('/c', 'vcbuild.bat', targetArch, 'nosign');
  const promise = spawn('cmd', args, { cwd: nodePath });
  progress(promise.child, windowsThresholds);
  await promise;
  return path.join(nodePath, 'Release/node.exe');
}

const unixThresholds = {
  'v8_base/deps/v8/src/date.o.d.raw': 50
};

async function compileOnUnix (targetArch) {
  const args = [];
  const cpu = { x86: 'ia32', x64: 'x64',
    armv6: 'arm', armv7: 'arm' }[targetArch];
  args.push('--dest-cpu', cpu);
  await spawn('./configure', args, { cwd: nodePath });
  const promise = spawn('make', [], { cwd: nodePath });
  progress(promise.child, unixThresholds);
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
    output = await compileOnWindows(targetArch);
  } else {
    output = await compileOnUnix(targetArch);
  }

  await mkdirp(path.dirname(local));
  await copyFile(output, local);
  await remove(buildPath);
}
