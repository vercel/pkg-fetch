import { hostPlatform, targetArchs } from './system.js';
import { localPlace, remotePlace } from './places.js';
import { log, wasReported } from './log.js';
import { Cloud } from './cloud.js';
import build from './build.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { verify } from './verify.js';
import { version } from '../package.json';

const cloud = new Cloud({ owner: 'zeit', repo: 'pkg-fetch' });

export function dontBuild (nodeVersion, targetPlatform, targetArch) {
  // binaries are not provided for x86 anymore
  if (targetPlatform !== 'win' && targetArch === 'x86') return true;
  // https://support.apple.com/en-us/HT201948
  // don't disable macos-x86 because it is not possible
  // to cross-compile for x86 from macos otherwise
  const major = nodeVersion.match(/^v?(\d+)/)[1] | 0;
  // node 0.12 does not compile on arm
  if (/^arm/.test(targetArch) && major === 0) return true;
  if (targetPlatform === 'freebsd' && major < 4) return true;
  if (targetPlatform === 'alpine' &&
      (targetArch !== 'x64' || major < 6)) return true;
  return false;
}

export async function main () {
  if (!process.env.GITHUB_USERNAME) {
    throw wasReported('No github credentials. Upload will fail!');
  }

  for (const nodeVersion in patchesJson) {
    for (const targetArch of targetArchs) {
      if (dontBuild(nodeVersion, hostPlatform, targetArch)) continue;
      const local = localPlace({ from: 'built', arch: targetArch,
        nodeVersion, platform: hostPlatform, version });
      const remote = remotePlace({ arch: targetArch,
        nodeVersion, platform: hostPlatform, version });
      if (await cloud.alreadyUploaded(remote)) continue;
      const short = path.basename(local);
      log.info(`Building ${short}...`);
      await build(nodeVersion, targetArch, local);
      log.info(`Verifying ${short}...`);
      await verify(local);
      log.info(`Uploading ${short}...`);
      try {
        await cloud.upload(local, remote);
      } catch (error) {
        // TODO catch only network errors
        if (!error.wasReported) log.error(error);
        log.info('Meanwhile i will continue making binaries');
      }
    }
  }
}

if (!module.parent) {
  main().catch((error) => {
    if (!error.wasReported) log.error(error);
    process.exit(2);
  });
}
