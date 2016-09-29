import * as system from './system.js';
import { abiToNodeRange, // eslint-disable-line no-duplicate-imports
  hostPlatform, knownArchs, toFancyArch, toFancyPlatform } from './system.js';
import { localPlace, remotePlace } from './places.js';
import { log, wasReported } from './log.js';
import build from './build.js';
import { download } from './cloud.js';
import { exists } from 'fs-promise';
import patchesJson from '../patches/patches.json';
import path from 'path';
import semver from 'semver';
import { version } from '../package.json';

export async function need (opts = {}) {
  let { nodeRange, platform, arch, forceFetch, forceBuild } = opts;
  if (!nodeRange) throw wasReported('nodeRange not specified');
  if (!platform) throw wasReported('platform not specified');
  if (!arch) throw wasReported('arch not specified');

  nodeRange = abiToNodeRange(nodeRange); // 'm48' -> 'node6'
  if (nodeRange !== 'latest') {
    if (!(/^node/.test(nodeRange))) throw wasReported('nodeRange must start with \'node\'');
    nodeRange = 'v' + nodeRange.slice(4); // 'node6' -> 'v6' for semver
  }

  platform = toFancyPlatform(platform); // win32 -> win
  arch = toFancyArch(arch); // ia32 -> x86

  const nodeVersions = Object.keys(patchesJson)
    .filter((nodeVersion) => semver.satisfies(nodeVersion, nodeRange) ||
                             nodeRange === 'latest')
    .sort((nv1, nv2) => semver.gt(nv1, nv2));
  if (!nodeVersions.length) {
    throw wasReported(`No available node version satisfies '${opts.nodeRange}'`);
  }
  const nodeVersion = nodeVersions.pop();
  const fetched = localPlace({ from: 'fetched', arch, nodeVersion, platform, version });
  const built = localPlace({ from: 'built', arch, nodeVersion, platform, version });
  const remote = remotePlace({ arch, nodeVersion, platform, version });

  let fetchFailed;
  if (!forceBuild) {
    if (await exists(fetched)) return fetched;
  }
  if (!forceFetch) {
    if (await exists(built)) {
      if (forceBuild) log.info('Reusing base binaries built locally:', built);
      return built;
    }
  }
  if (!forceBuild) {
    log.info('Fetching base binaries to:', path.dirname(fetched));
    if (await download(remote, fetched)) return fetched;
    fetchFailed = true;
  }
  if (fetchFailed) {
    log.info('Not found in GitHub releases:', JSON.stringify(remote));
  }
  log.info('Building base binary from source:', path.basename(built));
  if (hostPlatform !== platform) {
    throw wasReported(`Not able to build for '${opts.platform}' here, only for '${hostPlatform}'`);
  }
  if (knownArchs.indexOf(arch) < 0) {
    throw wasReported(`Unknown arch '${opts.arch}'. Specify ${knownArchs.join(', ')}`);
  }

  await build(nodeVersion, arch, built);
  return built;
}

export { system };
