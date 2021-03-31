import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import { spawnSync } from 'child_process';
import uniqueTempDir from 'unique-temp-dir';

import { hostPlatform } from './system';
import { log } from './log';
import patchesJson from '../patches/patches.json';

const buildPath = uniqueTempDir();
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

function getMajor(nodeVersion: string) {
  const [, version] = nodeVersion.match(/^v?(\d+)/) || ['', 0];
  return Number(version) | 0;
}

async function gitClone(nodeVersion: string) {
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

  spawnSync('git', args, { cwd: buildPath, stdio: 'inherit' });
}

async function gitResetHard(nodeVersion: string) {
  log.info(`Checking out ${nodeVersion}`);

  const patches = patchesJson[nodeVersion as keyof typeof patchesJson] as
    | string[]
    | { commit?: string };

  const commit =
    'commit' in patches && patches.commit ? patches.commit : nodeVersion;
  const args = ['--work-tree', '.', 'reset', '--hard', commit];

  spawnSync('git', args, { cwd: nodePath, stdio: 'inherit' });
}

async function applyPatches(nodeVersion: string) {
  log.info('Applying patches');

  const storedPatches = patchesJson[nodeVersion as keyof typeof patchesJson] as
    | string[]
    | { patches: string[] }
    | { sameAs: string };
  const storedPatch =
    'patches' in storedPatches ? storedPatches.patches : storedPatches;
  const patches =
    'sameAs' in storedPatch
      ? patchesJson[storedPatch.sameAs as keyof typeof patchesJson]
      : storedPatch;

  for (const patch of patches) {
    const patchPath = path.join(patchesPath, patch);
    const args = ['-p1', '-i', patchPath];
    spawnSync('patch', args, { cwd: nodePath, stdio: 'inherit' });
  }
}

async function compileOnWindows(nodeVersion: string, targetArch: string) {
  const args = [];
  args.push('/c', 'vcbuild.bat', targetArch, 'noetw');
  const major = getMajor(nodeVersion);

  if (major <= 10) {
    args.push('nosign', 'noperfctr');
  }

  spawnSync('cmd', args, { cwd: nodePath, stdio: 'inherit' });

  if (major <= 10) {
    return path.join(nodePath, 'Release/node.exe');
  }

  return path.join(nodePath, 'out/Release/node.exe');
}

const { MAKE_JOB_COUNT = os.cpus().length } = process.env;

async function compileOnUnix(nodeVersion: string, targetArch: string) {
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

  if (cpu) {
    args.push('--dest-cpu', cpu);
  }

  // first of all v8_inspector introduces the use
  // of `prime_rehash_policy` symbol that requires
  // GLIBCXX_3.4.18 on some systems
  // also we don't support any kind of debugging
  // against packaged apps, hence v8_inspector is useless
  const major = getMajor(nodeVersion);

  if (major >= 6) {
    args.push('--without-inspector');
  }

  // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L33
  if (hostPlatform === 'alpine') {
    args.push('--without-snapshot');
  }

  // TODO same for windows?
  spawnSync('./configure', args, { cwd: nodePath, stdio: 'inherit' });

  spawnSync(
    hostPlatform === 'freebsd' ? 'gmake' : 'make',
    ['-j', String(MAKE_JOB_COUNT)],
    {
      cwd: nodePath,
      stdio: 'inherit',
    }
  );

  const output = path.join(nodePath, 'out/Release/node');

  // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L36
  if (hostPlatform === 'alpine') {
    spawnSync('paxctl', ['-cm', output], { stdio: 'inherit' });
  }

  return output;
}

async function compile(nodeVersion: string, targetArch: string) {
  log.info('Compiling Node.js from sources...');
  const win = hostPlatform === 'win';

  if (win) {
    return compileOnWindows(nodeVersion, targetArch);
  }

  return compileOnUnix(nodeVersion, targetArch);
}

export default async function build(
  nodeVersion: string,
  targetArch: string,
  local: string
) {
  await fs.remove(buildPath);
  await fs.mkdirp(buildPath);

  await gitClone(nodeVersion);
  await gitResetHard(nodeVersion);
  await applyPatches(nodeVersion);
  const output = await compile(nodeVersion, targetArch);

  await fs.mkdirp(path.dirname(local));
  await fs.copy(output, local);
  await fs.remove(buildPath);
}
