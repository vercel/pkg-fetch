import * as system from './system.js';
import { hostArch, hostPlatform } from './system.js'; // eslint-disable-line no-duplicate-imports
import { exists } from 'fs-promise';
import { localPlace } from './places.js';
import patchesJson from '../patches/patches.json';
import semver from 'semver';
import { version } from '../package.json';

export async function need ({
  nodeRange = 'latest', platform = hostPlatform, arch = hostArch
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
  if (await exists(local)) return local;
}

export { system };
