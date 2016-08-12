import fs from 'fs';

function getAbi () {
  return 'm' + process.versions.modules;
}

export function abiToNodeRange (abi) {
  if (/^m?14/.test(abi)) return '0.12';
  if (/^m?46/.test(abi)) return '4';
  if (/^m?47/.test(abi)) return '5';
  if (/^m?48/.test(abi)) return '6';
  return abi;
}

export function toFancyPlatform (platform) {
  if (platform === 'darwin') return 'osx';
  if (platform === 'win32') return 'win';
  return platform;
}

function getPlatform () {
  const { platform } = process;
  return toFancyPlatform(platform);
}

export function toFancyArch (arch) {
  if (arch === 'ia32') return 'x86';
  if (arch === 'x86_64') return 'x64';
  return arch;
}

function getArmHost () {
  var cpu = fs.readFileSync('/proc/cpuinfo', 'utf8');
  if (cpu.indexOf('vfpv3') >= 0) return 'armv7';
  var name = cpu.split('model name')[1];
  if (name) name = name.split(':')[1];
  if (name) name = name.split('\n')[0];
  if (name && name.indexOf('ARMv7') >= 0) return 'armv7';
  return 'armv6';
}

function getHost () {
  var host = process.arch;
  if (host === 'arm') return getArmHost();
  return toFancyArch(host);
}

function getTargets () {
  const host = getHost();
  if (host === 'x64') return [ 'x64', 'x86' ];
  // TODO find a way to crosscompile for armv6 on armv7
  return [ host ];
}

function getKnownArchs () {
  const host = getHost();
  const archs = [ 'x64', 'x86', 'armv6', 'armv7' ];
  if (archs.indexOf(host) < 0) throw new Error(`Unknown arch ${host}`);
  return archs;
}

export const abi = getAbi();
export const platform = getPlatform();
export const host = getHost();
export const targets = getTargets();
export const knownArchs = getKnownArchs();
