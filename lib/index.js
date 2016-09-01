import * as system from './system.js';
import { abiToNodeRange, // eslint-disable-line no-duplicate-imports
  toFancyArch, toFancyPlatform } from './system.js';
import { localPlace, remotePlace } from './places.js';
import { log, wasReported } from './log.js';
import build from './build.js';
import { download } from './cloud.js';
import { exists } from 'fs-promise';
import patchesJson from '../patches/patches.json';
import semver from 'semver';
import { version } from '../package.json';

export async function need ({
  nodeRange, platform, arch, forceDownload, forceBuild
} = {}) {
  if (!nodeRange) throw wasReported('nodeRange not specified');
  if (!platform) throw wasReported('platform not specified');
  if (!arch) throw wasReported('arch not specified');

  nodeRange = abiToNodeRange(nodeRange); // m48 -> '6'
  nodeRange = nodeRange.toString(); // 6 -> '6'
  platform = toFancyPlatform(platform); // win32 -> win
  arch = toFancyArch(arch); // ia32 -> x86

  const nodeVersions = Object.keys(patchesJson)
    .filter((nodeVersion) => semver.satisfies(nodeVersion, nodeRange) ||
                             nodeRange === 'latest')
    .sort((nv1, nv2) => semver.gt(nv1, nv2));
  if (!nodeVersions.length) {
    throw wasReported(`No available node version satisfies '${nodeRange}'`);
  }
  const nodeVersion = nodeVersions.pop();
  const downloaded = localPlace({ from: 'downloaded', arch, nodeVersion, platform, version });
  const built = localPlace({ from: 'built', arch, nodeVersion, platform, version });

  let downloadFailed;
  if (!forceDownload && !forceBuild) {
    if (await exists(downloaded)) return downloaded;
    if (await exists(built)) return built;
  }
  if (!forceBuild) {
    log.info('Downloading base binaries to \'~/.pkg-cache\'...');
    const remote = remotePlace({ arch, nodeVersion, platform, version });
    if (await download(remote, downloaded)) return downloaded;
    downloadFailed = true;
  }
  if (downloadFailed) log.info('Not found in GitHub releases. Building...');
  await build(nodeVersion, arch, built);
  return built;
}

export { system };
