import fs from 'fs';

function getAbi () {
  return 'm' + process.versions.modules;
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
  if (host === 'ia32') return 'x86';
  if (host === 'arm') return getArmHost();
  return host;
}

function getTargets () {
  const host = getHost();
  if (host === 'x64') return [ 'x64', 'x86' ];
  // TODO find a way to crosscompile for armv6 on armv7
  return [ host ];
}

function getKnownTargets () {
  const host = getHost();
  const kt = [ 'x64', 'x86', 'armv6', 'armv7' ];
  if (kt.indexOf(host) < 0) throw new Error(`Unknown arch ${host}`);
  return kt;
}

export const abi = getAbi();
export const host = getHost();
export const targets = getTargets();
export const knownTargets = getKnownTargets();
