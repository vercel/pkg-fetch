import expandTemplate from 'expand-template';
import os from 'os';
import path from 'path';
const expand = expandTemplate();

const binaries = {
  moduleName: 'pkg-base-binary',
  localPath: '~/.pkg-cache/{version}/{nodeVersion}-{platform}-{arch}/'
};

export function localPath (opts) {
  const p = binaries.localPath;
  const atHome = p.replace('~', os.homedir());
  return expand(path.resolve(atHome), opts);
}
