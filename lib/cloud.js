import { createRelease, downloadUrl, getRelease,
  getReleaseDraft, tryDirectly, uploadAsset } from './github.js';
import { mkdirp, remove } from 'fs-promise';
import assert from 'assert';
import { moveFile } from './copy-file.js';
import path from 'path';

function uniqueName (name, names) {
  if (names.indexOf(name) < 0) return name;
  let newName;
  let counter = 0;
  while (true) {
    newName = `${name}-${counter}`;
    if (names.indexOf(newName) < 0) return newName;
    counter += 1;
  }
}

export async function upload (local, remote) {
  const { tag } = remote;
  let release = await getRelease(tag);
  if (!release) release = await getReleaseDraft(tag);
  if (!release) release = await createRelease(tag);
  const names = release.assets.map(({ name }) => {
    assert(name);
    return name;
  });
  const name = uniqueName(remote.name, names);
  await uploadAsset(local, release, name);
}

export async function download (remote, local) {
  const { tag } = remote;
  const tempFile = local + '.downloading';
  await mkdirp(path.dirname(tempFile));
  const short = path.basename(local);
  const ok = await tryDirectly(tag, remote.name, tempFile, short);
  if (!ok) {
    let release = await getRelease(tag);
    if (!release) release = await getReleaseDraft(tag);
    if (!release) return false;
    const assets = release.assets.filter(({ name }) => {
      assert(name);
      return name === remote.name;
    });
    if (!assets.length) return false;
    assert(assets.length === 1);
    const asset = assets[0];
    await downloadUrl(asset.url, tempFile, short);
  }
  await remove(local);
  await moveFile(tempFile, local);
  await remove(tempFile);
  return true;
}
