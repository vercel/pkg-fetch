import expandTemplate from 'expand-template';
const expand = expandTemplate();

const binaries = {
  moduleName: 'pkg-base-binary',
  localPath: '~/.pkg-cache/{version}/{nodeVersion}-{platform}-{arch}/'
};

export function localPath (opts) {
  return expand(binaries.localPath, opts);
}
