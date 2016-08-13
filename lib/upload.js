import { createRelease, getRelease, uploadAsset } from './github.js';
import { hostPlatform, targetArchs } from './system.js';
import { localPlace, remotePlace } from './places.js';
import assert from 'assert';
import build from './build.js';
import chalk from 'chalk';
import patchesJson from '../patches/patches.json';
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

async function upload (local, remote) {
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

function isBrokenBuild (nodeVersion, targetArch) {
  if (/^v?0/.test(nodeVersion) &&
      /^arm/.test(targetArch)) return true;
  return false;
}

export async function main () {
  for (const nodeVersion in patchesJson) {
    for (const targetArch of targetArchs) {
      if (isBrokenBuild(nodeVersion, targetArch)) continue;
      const local = localPlace({ arch: targetArch, nodeVersion, platform: hostPlatform, version });
      console.error(`> ${chalk.yellow('Building')} ${nodeVersion}-${targetArch}`);
      await build({ copyDest: local, nodeVersion, targetArch });
      console.error(`> ${chalk.yellow('Uploading')} ${local}`);
      const remote = remotePlace({ arch: targetArch, nodeVersion, platform: hostPlatform, version });
      await upload(local, remote);
    }
  }
}

if (!module.parent) {
  main().catch((error) => {
    console.error(`> ${chalk.red('Error!')} ${error}`);
    process.exit(2);
  });
}
