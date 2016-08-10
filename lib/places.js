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

export function remotePlace (opts) {
  const p = placesJson.remotePlace;
  return expand(p, opts);
}
