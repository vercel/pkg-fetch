import * as system from './system.js';
import { abiToNodeRange, hostArch, hostPlatform, // eslint-disable-line no-duplicate-imports
  isValidNodeRange, knownArchs, toFancyArch, toFancyPlatform } from './system.js';
import { localPlace, remotePlace } from './places.js';
import { log, wasReported } from './log.js';
import { Cloud } from './cloud.js';
import build from './build.js';
import { exists } from 'fs-extra';
import patchesJson from '../patches/patches.json';
import path from 'path';
import semver from 'semver';
import { version } from '../package.json';

const cloud = new Cloud({ owner: 'zeit', repo: 'pkg-fetch' });

export async function need (opts = {}) { // eslint-disable-line complexity
  let { nodeRange, platform, arch, forceFetch, forceBuild, dryRun } = opts;
  if (!nodeRange) throw wasReported('nodeRange not specified');
  if (!platform) throw wasReported('platform not specified');
  if (!arch) throw wasReported('arch not specified');

  nodeRange = abiToNodeRange(nodeRange); // 'm48' -> 'node6'
  if (!isValidNodeRange(nodeRange)) {
    throw wasReported('nodeRange must start with \'node\'');
  }
  if (nodeRange !== 'latest') {
    nodeRange = 'v' + nodeRange.slice(4); // 'node6' -> 'v6' for semver
  }

  platform = toFancyPlatform(platform); // win32 -> win
  arch = toFancyArch(arch); // ia32 -> x86

  function satisfyingNodeVersion () {
    const versions = Object.keys(patchesJson)
      .filter((nv) => semver.satisfies(nv, nodeRange) ||
                      nodeRange === 'latest')
      .sort((nv1, nv2) => (semver.gt(nv1, nv2) ? 1 : -1));
    return versions.pop();
  }

  const nodeVersion = satisfyingNodeVersion();
  if (!nodeVersion) {
    throw wasReported(`No available node version satisfies '${opts.nodeRange}'`);
  }

  const fetched = localPlace({ from: 'fetched', arch, nodeVersion, platform, version });
  const built = localPlace({ from: 'built', arch, nodeVersion, platform, version });
  const remote = remotePlace({ arch, nodeVersion, platform, version });

  let fetchFailed;
  if (!forceBuild) {
    if (await exists(fetched)) {
      if (dryRun) return 'exists';
      return fetched;
    }
  }
  if (!forceFetch) {
    if (await exists(built)) {
      if (dryRun) return 'exists';
      if (forceBuild) log.info('Reusing base binaries built locally:', built);
      return built;
    }
  }
  if (!forceBuild) {
    if (dryRun) return 'fetched';
    if (await cloud.download(remote, fetched)) return fetched;
    fetchFailed = true;
  }
  if (!dryRun && fetchFailed) {
    log.info('Not found in GitHub releases:', JSON.stringify(remote));
  }
  if (!dryRun) {
    log.info('Building base binary from source:', path.basename(built));
  }
  if (hostPlatform !== platform) {
    throw wasReported(`Not able to build for '${opts.platform}' here, only for '${hostPlatform}'`);
  }
  if (hostArch !== arch) {
    throw wasReported(`Not able to build for '${opts.arch}' here, only for '${hostArch}'`);
  }
  if (knownArchs.indexOf(arch) < 0) {
    throw wasReported(`Unknown arch '${opts.arch}'. Specify ${knownArchs.join(', ')}`);
  }

  if (dryRun) return 'built';
  await build(nodeVersion, arch, built);
  return built;
}

export { system };
