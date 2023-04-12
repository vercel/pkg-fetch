import fs from 'fs';
import { spawnSync } from 'child_process';

function getHostAbi() {
  return `m${process.versions.modules}`;
}

export function abiToNodeRange(abi: string) {
  if (/^m?14/.test(abi)) return 'node0.12';
  if (/^m?46/.test(abi)) return 'node4';
  if (/^m?47/.test(abi)) return 'node5';
  if (/^m?48/.test(abi)) return 'node6';
  if (/^m?51/.test(abi)) return 'node7';
  if (/^m?57/.test(abi)) return 'node8';
  if (/^m?59/.test(abi)) return 'node9';
  if (/^m?64/.test(abi)) return 'node10';
  if (/^m?67/.test(abi)) return 'node11';
  if (/^m?72/.test(abi)) return 'node12';
  if (/^m?79/.test(abi)) return 'node13';
  if (/^m?83/.test(abi)) return 'node14';
  return abi;
}

export function isValidNodeRange(nodeRange: string) {
  if (nodeRange === 'latest') return true;
  if (!/^node/.test(nodeRange)) return false;
  return true;
}

export function toFancyPlatform(platform: string) {
  if (platform === 'darwin') return 'macos';
  if (platform === 'lin') return 'linux';
  if (platform === 'mac') return 'macos';
  if (platform === 'osx') return 'macos';
  if (platform === 'win32') return 'win';
  if (platform === 'windows') return 'win';
  return platform;
}

function detectAlpine() {
  const { platform } = process;

  if (platform !== 'linux') {
    return false;
  }

  // https://github.com/sass/node-sass/issues/1589#issuecomment-265292579
  const ldd = spawnSync('ldd').stderr?.toString();

  if (ldd == null) {
    return fs.readdirSync('/lib').some((file) => file.startsWith('libc.musl'));
  }

  if (/\bmusl\b/.test(ldd)) {
    return true;
  }

  const lddNode = spawnSync('ldd', [process.execPath]).stdout.toString();
  return /\bmusl\b/.test(lddNode);
}

const isAlpine = detectAlpine();

function getHostPlatform() {
  const { platform } = process;

  if (isAlpine) {
    return 'alpine';
  }

  return toFancyPlatform(platform);
}

function getKnownPlatforms() {
  return ['alpine', 'freebsd', 'linux', 'linuxstatic', 'macos', 'win'];
}

export function toFancyArch(arch: string) {
  if (arch === 'ia32') return 'x86';
  if (arch === 'x86_64') return 'x64';
  return arch;
}

function getArmUnameArch() {
  const uname = spawnSync('uname', ['-a']);

  if (uname.error) {
    return '';
  }

  let unameOut = uname.stdout && uname.stdout.toString();
  unameOut = (unameOut || '').toLowerCase();

  if (unameOut.includes('aarch64')) return 'arm64';
  if (unameOut.includes('arm64')) return 'arm64';
  if (unameOut.includes('armv7')) return 'armv7';

  return '';
}

function getArmHostArch() {
  const cpu = fs.readFileSync('/proc/cpuinfo', 'utf8');

  if (cpu.indexOf('vfpv3') >= 0) {
    return 'armv7';
  }

  let name = cpu.split('model name')[1];

  if (name) [, name] = name.split(':');
  if (name) [name] = name.split('\n');
  if (name && name.indexOf('ARMv7') >= 0) return 'armv7';

  return 'armv6';
}

function getHostArch() {
  const { arch } = process;

  if (arch === 'arm') {
    return getArmUnameArch() || getArmHostArch();
  }

  return toFancyArch(arch);
}

function getTargetArchs() {
  const arch = getHostArch();

  if (arch === 'x64') {
    return ['x64', 'x86'];
  }

  return [arch];
}

function getKnownArchs() {
  return ['x64', 'x86', 'armv7', 'arm64', 'ppc64', 's390x'];
}

export const hostAbi = getHostAbi();
export const hostPlatform = getHostPlatform();
export const knownPlatforms = getKnownPlatforms();
export const hostArch = getHostArch();
export const targetArchs = getTargetArchs();
export const knownArchs = getKnownArchs();
