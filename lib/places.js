import { lte, major, minor } from 'semver';
import expandTemplate from 'expand-template';
import os from 'os';
import path from 'path';
import placesJson from '../places.json';
const expand = expandTemplate();

export function localPlace (opts) {
  const p = placesJson.localPlace;
  const atHome = p.replace('~', os.homedir());
  return expand(path.resolve(atHome), opts);
}

function tagFromVersion (version) {
  if (lte(version, '0.0.4')) {
    return `v${version}`;
  }
  const mj = major(version);
  const mn = minor(version);
  return `v${mj}.${mn}.0`;
}

export function remotePlace (opts) {
  const p = placesJson.remotePlace;
  return { name: expand(p, opts),
    tag: tagFromVersion(opts.version) };
}
