import expandTemplate from 'expand-template';
import os from 'os';
import path from 'path';
const expand = expandTemplate();

const binaries = {
  moduleName: 'pkg-base-binary',
  localPlace: '~/.pkg-cache/{version}/{nodeVersion}-{platform}-{arch}/'
};

export function localPlace (opts) {
  const p = binaries.localPlace;
  const atHome = p.replace('~', os.homedir());
  return expand(path.resolve(atHome), opts);
}
