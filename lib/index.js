import * as system from './system.js';
import { abiToNodeRange, hostArch, // eslint-disable-line no-duplicate-imports
  hostPlatform, toFancyArch, toFancyPlatform } from './system.js';
import { localPlace, remotePlace } from './places.js';
import build from './build.js';
import { download } from './cloud.js';
import { exists } from 'fs-promise';
import log from './log.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import semver from 'semver';
import { version } from '../package.json';

export async function need ({
  nodeRange = 'latest', platform = hostPlatform,
  arch = hostArch, dontReadCache, dontDownload, dontBuild
} = {}) {
  nodeRange = abiToNodeRange(nodeRange); // m48 -> '6'
  nodeRange = nodeRange.toString(); // 6 -> '6'
  platform = toFancyPlatform(platform); // win32 -> win
  arch = toFancyArch(arch); // ia32 -> x86

  const nodeVersions = Object.keys(patchesJson)
    .filter((nodeVersion) => semver.satisfies(nodeVersion, nodeRange) ||
                             nodeRange === 'latest')
    .sort((nv1, nv2) => semver.gt(nv1, nv2));
  if (!nodeVersions.length) {
    throw new Error(`No available node version satisfies '${nodeRange}'`);
  }
  const nodeVersion = nodeVersions.pop();
  const local = localPlace({ arch, nodeVersion, platform, version });
  const name = path.basename(local);

  if (dontReadCache) {
    log.info('Refusing to read cache');
  } else {
    log.info('Looking in cache', name);
    if (await exists(local)) return local;
    log.warn('Not found in cache');
  }
  if (dontDownload) {
    log.info('Refusing to download');
  } else {
    log.info('Downloading', name);
    const remote = remotePlace({ arch, nodeVersion, platform, version });
    if (await download(remote, local)) return local;
    log.warn('Not found in GitHub releases');
  }
  if (dontBuild) {
    log.info('Refusing to build from source');
  } else {
    log.info('Building from source');
    await build({ copyDest: local, nodeVersion, targetArch: arch });
    return local;
  }
}

export { system };
