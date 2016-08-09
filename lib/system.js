import fs from 'fs';

function getAbi () {
  return 'm' + process.versions.modules;
}

function getArmArch () {
  var cpu = fs.readFileSync('/proc/cpuinfo', 'utf8');
  if (cpu.indexOf('vfpv3') >= 0) return 'armv7';
  var name = cpu.split('model name')[1];
  if (name) name = name.split(':')[1];
  if (name) name = name.split('\n')[0];
  if (name && name.indexOf('ARMv7') >= 0) return 'armv7';
  return 'armv6';
}

function getArch () {
  var arch = process.arch;
  if (arch === 'ia32') return 'x86';
  if (arch === 'arm') return getArmArch();
  return arch;
}

export const abi = getAbi();
export const arch = getArch();
export const platform = process.platform;
