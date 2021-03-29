import { major, minor } from 'semver';
import expandTemplate from 'expand-template';
import os from 'os';
import path from 'path';
import placesJson from '../places.json';

const expand = expandTemplate();

const { PKG_CACHE_PATH } = process.env;
const IGNORE_TAG = Boolean(process.env.PKG_IGNORE_TAG);

const cachePath = PKG_CACHE_PATH || path.join(os.homedir(), '.pkg-cache');

function tagFromVersion(version: string) {
  const mj = major(version);
  const mn = minor(version);

  return `v${mj}.${mn}`;
}

interface PlaceOptions {
  version: string;
  nodeVersion: string;
  platform: string;
  arch: string;
}

interface LocalPlaceOptions extends PlaceOptions {
  from: string;
}

export function localPlace(opts: LocalPlaceOptions) {
  const p = placesJson.localPlace;
  const { version } = opts;
  const atHome = IGNORE_TAG
    ? path.join(cachePath, p)
    : path.join(cachePath, tagFromVersion(version), p);

  return expand(path.resolve(atHome), opts);
}

interface RemotePlaceOptions extends PlaceOptions {
  tag?: string;
}
export function remotePlace(opts: RemotePlaceOptions) {
  const p = placesJson.remotePlace;
  const { version } = opts;
  const tag = tagFromVersion(version);
  Object.assign(opts, { tag });
  return { tag, name: expand(p, opts) };
}
