import crypto from 'crypto';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';

import { hostArch, hostPlatform } from './system';
import { log } from './log';
import patchesJson from '../patches/patches.json';

const buildPath = path.resolve(
  process.env.PKG_BUILD_PATH ||
    path.join(os.tmpdir(), `pkg.${crypto.randomBytes(12).toString('hex')}`)
);
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const nodeRepo = 'https://github.com/nodejs/node';

function getMajor(nodeVersion: string) {
  const [, version] = nodeVersion.match(/^v?(\d+)/) || ['', 0];
  return Number(version) | 0;
}

function getConfigureArgs(major: number): string[] {
  const args: string[] = [];

  // first of all v8_inspector introduces the use
  // of `prime_rehash_policy` symbol that requires
  // GLIBCXX_3.4.18 on some systems
  // also we don't support any kind of debugging
  // against packaged apps, hence v8_inspector is useless
  args.push('--without-inspector');

  // https://github.com/mhart/alpine-node/blob/base-7.4.0/Dockerfile#L33
  if (hostPlatform === 'alpine') {
    args.push('--without-snapshot');
  }

  // Link Time Optimization
  if (major >= 12) {
    if (hostPlatform === 'linux' || hostPlatform === 'alpine') {
      args.push('--enable-lto');
    }
  }

  // DTrace
  args.push('--without-dtrace');

  // bundled npm package manager
  args.push('--without-npm');

  // custom ones
  if (process.env.PKG_BUILD_CONFIGURE_ARGS) {
    args.push(...process.env.PKG_BUILD_CONFIGURE_ARGS.split(' '));
  }

  return args;
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
  args.push('/c', 'vcbuild.bat', targetArch);
  const major = getMajor(nodeVersion);

  // Event Tracing for Windows
  args.push('noetw');

  // Performance counters on Windows
  if (major <= 10) {
    args.push('noperfctr');
  }

  // Link Time Code Generation
  if (major >= 12) {
    args.push('ltcg');
  }

  spawnSync('cmd', args, {
    cwd: nodePath,
    env: { ...process.env, config_flags: getConfigureArgs(major).join(' ') },
    stdio: 'inherit',
  });

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

  if (hostArch !== targetArch) {
    log.warn('Cross compiling!');
    log.warn('You are responsible for appropriate env like CC, CC_host, etc.');
    args.push('--cross-compiling');
  }

  args.concat(getConfigureArgs(getMajor(nodeVersion)));

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

  spawnSync(process.env.STRIP || 'strip', [output], {
    stdio: 'inherit',
  });

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

async function hash(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const resultHash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    input.on('error', (e) => {
      reject(e);
    });

    input.on('readable', () => {
      const data = input.read();
      if (data) {
        resultHash.update(data);
      } else {
        resolve(resultHash.digest('hex'));
      }
    });
  });
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
  const outputHash = await hash(output);

  await fs.mkdirp(path.dirname(local));
  await fs.copy(output, local);
  await fs.promises.writeFile(
    `${local}.sha256sum`,
    `${outputHash}  ${path.basename(local)}
`
  );
  await fs.remove(buildPath);
}
