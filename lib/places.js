import { major, minor } from 'semver';
import expandTemplate from 'expand-template';
import os from 'os';
import path from 'path';
import placesJson from '../places.json';
const expand = expandTemplate();

function tagFromVersion (version) {
  const mj = major(version);
  const mn = minor(version);
  return `v${mj}.${mn}.0`;
}

export function localPlace (opts) {
  const p = placesJson.localPlace;
  const atHome = p.replace('~', os.homedir());
  const { version } = opts;
  Object.assign(opts, { tag: tagFromVersion(version) });
  return expand(path.resolve(atHome), opts);
}

export function remotePlace (opts) {
  const p = placesJson.remotePlace;
  return { tag: tagFromVersion(opts.version),
    name: expand(p, opts) };
}
