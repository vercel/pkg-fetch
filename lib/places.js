import { major, minor } from 'semver';
import expandTemplate from 'expand-template';
import os from 'os';
import path from 'path';
import placesJson from '../places.json';
const expand = expandTemplate();

const { PKG_CACHE_PATH } = process.env;
const cachePath = PKG_CACHE_PATH ||
  path.join(os.homedir(), '.pkg-cache');

function tagFromVersion (version) {
  const mj = major(version);
  const mn = minor(version);
  return `v${mj}.${mn}`;
}

export function localPlace (opts) {
  const p = placesJson.localPlace;
  const { version } = opts;
  const tag = tagFromVersion(version);
  Object.assign(opts, { tag });
  const atHome = path.join(cachePath, p);
  return expand(path.resolve(atHome), opts);
}

export function remotePlace (opts) {
  const p = placesJson.remotePlace;
  const { version } = opts;
  const tag = tagFromVersion(version);
  Object.assign(opts, { tag });
  return { tag, name: expand(p, opts) };
}
