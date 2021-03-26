import os from 'os';
import { mkdirp, remove } from 'fs-extra';
import path from 'path';
import { progress, spawn } from './spawn';
import { copyFile } from './copy-file';
import { hostPlatform } from './system';
import { log } from './log';
import patchesJson from '../patches/patches.json';
import { tempPath } from './temp-path';
import thresholds from './thresholds';

let buildPath;
if (process.env.GITHUB_USERNAME) {
  buildPath = path.join(__dirname, '..', 'precompile');
} else {
  buildPath = tempPath();
}

const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

async function gitClone(nodeVersion) {
  log.info('Cloning Node.js repository from GitHub...');
  const args = [
    'clone',
    '-b',
    nodeVersion,
    '--depth',
    '1',
    '--single-branch',
    '--bare',
    '--progress',
    nodeRepo,
    'node/.git',
  ];
  const promise = spawn('git', args, { cwd: buildPath });
  progress(promise, thresholds('clone'));
  await promise;
}

async function gitResetHard(nodeVersion) {
  log.info(`Checking out ${nodeVersion}`);
  const patches = patchesJson[nodeVersion];
  const commit = patches.commit || nodeVersion;
  const args = ['--work-tree', '.', 'reset', '--hard', commit];
  await spawn('git', args, { cwd: nodePath });
}

async function applyPatches(nodeVersion) {
  log.info('Applying patches');
  let patches = patchesJson[nodeVersion];
  patches = patches.patches || patches;
  if (patches.sameAs) patches = patchesJson[patches.sameAs];
  for (const patch of patches) {
    const patchPath = path.join(patchesPath, patch);
    const args = ['-p1', '-i', patchPath];
    await spawn('patch', args, { cwd: nodePath });
  }
}

async function compileOnWindows(nodeVersion, targetArch) {
  const args = [];
  args.push('/c', 'vcbuild.bat', targetArch, 'noetw');
  const major = nodeVersion.match(/^v?(\d+)/)[1] | 0;
  if (major <= 10) args.push('nosign', 'noperfctr');
  const promise = spawn('cmd', args, { cwd: nodePath });
  progress(promise, thresholds('vcbuild', nodeVersion));
  await promise;
  if (major <= 10) return path.join(nodePath, 'Release/node.exe');
  return path.join(nodePath, 'out/Release/node.exe');
}

const { MAKE_JOB_COUNT = os.cpus().length } = process.env;

async function compileOnUnix(nodeVersion, targetArch) {
  const args = [];
  const cpu = {
    x86: 'ia32',
    x64: 'x64',
    armv6: 'arm',
    armv7: 'arm',
    arm64: 'arm64',
    ppc64: 'ppc64',
    s390x: 's390x',
  }[targetArch];
  args.push('--dest-cpu', cpu);
  // first of all v8_inspector introduces the use
  // of `prime_rehash_policy` symbol that requires
  // GLIBCXX_3.4.18 on some systems
  // also we don't support any kind of debugging
  // against packaged apps, hence v8_inspector is useless
  const major = nodeVersion.match(/^v?(\d+)/)[1] | 0;
  if (major >= 6) args.push('--without-inspector');
  // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L33
  if (hostPlatform === 'alpine') args.push('--without-snapshot');
  // TODO same for windows?
  await spawn('./configure', args, { cwd: nodePath });
  const make = hostPlatform === 'freebsd' ? 'gmake' : 'make';
  const promise = spawn(make, ['-j', MAKE_JOB_COUNT], { cwd: nodePath });
  progress(promise, thresholds('make', nodeVersion));
  await promise;
  const output = path.join(nodePath, 'out/Release/node');
  // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L36
  if (hostPlatform === 'alpine') await spawn('paxctl', ['-cm', output]);
  return output;
}

async function compile(nodeVersion, targetArch) {
  log.info('Compiling Node.js from sources...');
  const win = hostPlatform === 'win';
  if (win) return compileOnWindows(nodeVersion, targetArch);
  return compileOnUnix(nodeVersion, targetArch);
}

export default async function build(nodeVersion, targetArch, local) {
  await remove(buildPath);
  await mkdirp(buildPath);
  await gitClone(nodeVersion);
  await gitResetHard(nodeVersion);
  await applyPatches(nodeVersion);
  const output = await compile(nodeVersion, targetArch);
  await mkdirp(path.dirname(local));
  await copyFile(output, local);
  await remove(buildPath);
}
