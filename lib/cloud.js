import { createRelease, downloadAsset,
  getRelease, uploadAsset } from './github.js';
import { mkdirp, remove } from 'fs-promise';
import assert from 'assert';
import { moveFile } from './copy-file.js';
import path from 'path';
import { version } from '../package.json';

function uniqueName (remote, names) {
  if (names.indexOf(remote) < 0) return remote;
  let name;
  let counter = 0;
  while (true) {
    name = `${remote}-${counter}`;
    if (names.indexOf(name) < 0) return name;
    counter += 1;
  }
}

export async function upload (local, remote) {
  const tag = `v${version}`;
  let release = await getRelease(tag);
  if (!release) release = await createRelease(tag);
  const names = release.assets.map(({ name }) => {
    assert(name);
    return name;
  });
  const name = uniqueName(remote, names);
  await uploadAsset(local, release, name);
}

export async function download (remote, local) {
  const tag = `v${version}`;
  const release = await getRelease(tag);
  if (!release) return false;
  const assets = release.assets.filter(({ name }) => {
    assert(name);
    return name === remote;
  });
  if (!assets.length) return false;
  assert(assets.length === 1);
  const asset = assets[0];
  const tempFile = local + '.downloading';
  await mkdirp(path.dirname(tempFile));
  await downloadAsset(asset, tempFile);
  await moveFile(tempFile, local);
  await remove(tempFile);
  return true;
}
