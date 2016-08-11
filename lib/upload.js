import { createRelease, getRelease, uploadAsset } from './github.js';

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

export default async function upload (local, remote, version) {
  const tag = `v${version}`;
  let release = await getRelease(tag);
  if (!release) release = await createRelease(tag);
  const names = release.assets.map(({ name }) => name);
  const name = uniqueName(remote, names);
  await uploadAsset(local, release, name);
}
