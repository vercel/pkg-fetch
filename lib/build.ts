import { createGunzip } from 'zlib';
import crypto from 'crypto';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import tar from 'tar-fs';

import { cachePath } from './places';
import { downloadUrl, hash, spawn } from './utils';
import { hostArch, hostPlatform } from './system';
import { log, wasReported } from './log';
import patchesJson from '../patches/patches.json';

const buildPath = path.resolve(
  process.env.PKG_BUILD_PATH ||
    path.join(os.tmpdir(), `pkg.${crypto.randomBytes(12).toString('hex')}`)
);
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');

const nodeRepo = 'https://nodejs.org/dist';
const nodeArchivePath = path.join(cachePath, 'node');

function getMajor(nodeVersion: string) {
  const [, version] = nodeVersion.match(/^v?(\d+)/) || ['', 0];
  return Number(version) | 0;
}

function getConfigureArgs(major: number, targetPlatform: string): string[] {
  const args: string[] = [];

  // first of all v8_inspector introduces the use
  // of `prime_rehash_policy` symbol that requires
  // GLIBCXX_3.4.18 on some systems
  // also we don't support any kind of debugging
  // against packaged apps, hence v8_inspector is useless
  args.push('--without-inspector');

  if (hostPlatform === 'alpine') {
    // Statically Link against libgcc and libstdc++ libraries. See vercel/pkg#555.
    // libgcc and libstdc++ grant GCC Runtime Library Exception of GPL
    args.push('--partly-static');
  }

  if (targetPlatform === 'linuxstatic') {
    args.push('--fully-static');
  }

  // Link Time Optimization
  if (major >= 12) {
    if (hostPlatform !== 'win') {
      args.push('--enable-lto');
    }
  }

  // production binaries do NOT take NODE_OPTIONS from end-users
  args.push('--without-node-options');

  // The dtrace and etw support was removed in https://github.com/nodejs/node/commit/aa3a572e6bee116cde69508dc29478b40f40551a
  if (major <= 18) {
    // DTrace
    args.push('--without-dtrace');
  }

  // bundled npm package manager
  args.push('--without-npm');

  // Small ICU
  args.push('--with-intl=small-icu');

  // Workaround for nodejs/node#39313
  // All supported macOS versions have zlib as a system library
  if (targetPlatform === 'macos') {
    args.push('--shared-zlib');
  }

  return args;
}

async function tarFetch(nodeVersion: string) {
  log.info('Fetching Node.js source archive from nodejs.org...');

  const distUrl = `${nodeRepo}/${nodeVersion}`;
  const tarName = `node-${nodeVersion}.tar.gz`;

  const archivePath = path.join(nodeArchivePath, tarName);
  const hashPath = path.join(nodeArchivePath, `${tarName}.sha256sum`);

  if (fs.existsSync(hashPath) && fs.existsSync(archivePath)) {
    return;
  }

  await fs.remove(hashPath).catch(() => undefined);
  await fs.remove(archivePath).catch(() => undefined);

  await downloadUrl(`${distUrl}/SHASUMS256.txt`, hashPath);

  await fs.writeFile(
    hashPath,
    (await fs.readFile(hashPath, 'utf8'))
      .split('\n')
      .filter((l) => l.includes(tarName))[0]
  );

  await downloadUrl(`${distUrl}/${tarName}`, archivePath);
}

async function tarExtract(nodeVersion: string, suppressTarOutput: boolean) {
  log.info('Extracting Node.js source archive...');

  const tarName = `node-${nodeVersion}.tar.gz`;

  const expectedHash = (
    await fs.readFile(
      path.join(nodeArchivePath, `${tarName}.sha256sum`),
      'utf8'
    )
  ).split(' ')[0];
  const actualHash = await hash(path.join(nodeArchivePath, tarName));

  if (expectedHash !== actualHash) {
    await fs.remove(path.join(nodeArchivePath, tarName));
    await fs.remove(path.join(nodeArchivePath, `${tarName}.sha256sum`));
    throw wasReported(`Hash mismatch for ${tarName}`);
  }

  const pipe = promisify(pipeline);

  const source = fs.createReadStream(path.join(nodeArchivePath, tarName));
  const gunzip = createGunzip();
  const extract = tar.extract(nodePath, {
    strip: 1,
    map: (header) => {
      if (!suppressTarOutput) {
        log.info(header.name);
      }
      return header;
    },
  });

  await pipe(source, gunzip, extract);
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
    await spawn('patch', args, { cwd: nodePath, stdio: 'inherit' });
  }
}

export async function fetchExtractApply(nodeVersion: string, quietExtraction: boolean) {
  await tarFetch(nodeVersion);
  await tarExtract(nodeVersion, quietExtraction);
  await applyPatches(nodeVersion);
}

async function compileOnWindows(
  nodeVersion: string,
  targetArch: string,
  targetPlatform: string
) {
  const args = ['/c', 'vcbuild.bat', targetArch];
  const major = getMajor(nodeVersion);
  const config_flags = getConfigureArgs(major, targetPlatform);

  // The dtrace and etw support was removed in https://github.com/nodejs/node/commit/aa3a572e6bee116cde69508dc29478b40f40551a
  if (major <= 18) {
    // Event Tracing for Windows
    args.push('noetw');
  }

  // Performance counters on Windows
  if (major <= 10) {
    args.push('noperfctr');
  }

  // Link Time Code Generation
  if (major >= 12) {
    args.push('ltcg');
  }

  // Can't cross compile for arm64 with small-icu
  if (
    hostArch !== targetArch &&
    !config_flags.includes('--with-intl=full-icu')
  ) {
    config_flags.push('--without-intl');
  }

  await spawn('cmd', args, {
    cwd: nodePath,
    env: { ...process.env, config_flags: config_flags.join(' ') },
    stdio: 'inherit',
  });

  if (major <= 10) {
    return path.join(nodePath, 'Release/node.exe');
  }

  return path.join(nodePath, 'out/Release/node.exe');
}

const { MAKE_JOB_COUNT = os.cpus().length } = process.env;

async function compileOnUnix(
  nodeVersion: string,
  targetArch: string,
  targetPlatform: string
) {
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

  if (targetArch === 'armv7') {
    const { CFLAGS = '', CXXFLAGS = '' } = process.env;
    process.env.CFLAGS = `${CFLAGS} -marm -mcpu=cortex-a7`;
    process.env.CXXFLAGS = `${CXXFLAGS} -marm -mcpu=cortex-a7`;

    args.push('--with-arm-float-abi=hard');
    args.push('--with-arm-fpu=vfpv3');
  }

  if (hostArch !== targetArch) {
    log.warn('Cross compiling!');
    log.warn('You are responsible for appropriate env like CC, CC_host, etc.');
    args.push('--cross-compiling');
  }

  args.push(...getConfigureArgs(getMajor(nodeVersion), targetPlatform));

  // TODO same for windows?
  await spawn('/bin/sh', ['./configure', ...args], {
    cwd: nodePath,
    stdio: 'inherit',
  });

  await spawn(
    hostPlatform === 'freebsd' ? 'gmake' : 'make',
    ['-j', String(MAKE_JOB_COUNT)],
    {
      cwd: nodePath,
      stdio: 'inherit',
    }
  );

  const output = path.join(nodePath, 'out/Release/node');

  await spawn(
    process.env.STRIP || 'strip',
    // global symbols are required for native bindings on macOS
    [...(targetPlatform === 'macos' ? ['-x'] : []), output],
    {
      stdio: 'inherit',
    }
  );

  if (targetPlatform === 'macos') {
    // Newer versions of Apple Clang automatically ad-hoc sign the compiled executable.
    // However, for final executable to be signable, base binary MUST NOT have an existing signature.
    await spawn('codesign', ['--remove-signature', output], {
      stdio: 'inherit',
    });
  }

  return output;
}

async function compile(
  nodeVersion: string,
  targetArch: string,
  targetPlatform: string
) {
  log.info('Compiling Node.js from sources...');
  const win = hostPlatform === 'win';

  if (win) {
    return compileOnWindows(nodeVersion, targetArch, targetPlatform);
  }

  return compileOnUnix(nodeVersion, targetArch, targetPlatform);
}

export async function prepBuildPath() {
  await fs.remove(buildPath);
  await fs.mkdirp(nodePath);
  await fs.mkdirp(nodeArchivePath);
}

export default async function build(
  nodeVersion: string,
  targetArch: string,
  targetPlatform: string,
  local: string
) {
  await prepBuildPath();
  await fetchExtractApply(nodeVersion, false);

  const output = await compile(nodeVersion, targetArch, targetPlatform);
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
