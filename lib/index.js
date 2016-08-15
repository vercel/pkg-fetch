import * as system from './system.js';
import { downloadAsset, getRelease } from './github.js';
import { exists, mkdirp } from 'fs-promise';
import { hostArch, hostPlatform } from './system.js'; // eslint-disable-line no-duplicate-imports
import { localPlace, remotePlace } from './places.js';
import assert from 'assert';
import patchesJson from '../patches/patches.json';
import path from 'path';
import semver from 'semver';
import { version } from '../package.json';

async function download (remote, local) {
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
  await downloadAsset(asset, local);
  return true;
}

export async function need ({
  nodeRange = 'latest', platform = hostPlatform,
  arch = hostArch, dontTakeLocal, dontDownload, dontBuild
} = {}) {
  nodeRange = system.abiToNodeRange(nodeRange);

  // TODO CROSSCOMPILATION
  if (platform !== hostPlatform) {
    throw new Error(`Currently only ${hostPlatform} is supported`);
  }
  if (arch !== hostArch) {
    throw new Error(`Currently only ${hostArch} is supported`);
  }

  nodeRange = nodeRange.toString(); // 6 -> '6'
  const nodeVersions = Object.keys(patchesJson)
    .filter((nodeVersion) => semver.satisfies(nodeVersion, nodeRange) ||
                             nodeRange === 'latest')
    .sort((nv1, nv2) => semver.gt(nv1, nv2));
  if (!nodeVersions.length) {
    throw new Error(`No available node version satisfies '${nodeRange}'`);
  }
  const nodeVersion = nodeVersions.pop();
  const local = localPlace({ arch, nodeVersion, platform, version });

  if (!dontTakeLocal) {
    if (await exists(local)) return local;
  }
  if (!dontDownload) {
    const remote = remotePlace({ arch, nodeVersion, platform, version });
    await mkdirp(path.dirname(local));
    if (await download(remote, local)) return local;
  }
  if (!dontBuild) {
    assert(false);
  }
}

export { system };
