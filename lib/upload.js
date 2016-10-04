import { hostPlatform, targetArchs } from './system.js';
import { localPlace, remotePlace } from './places.js';
import { log, wasReported } from './log.js';
import build from './build.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { upload } from './cloud.js';
import { verify } from './verify.js';
import { version } from '../package.json';

export function dontBuild (nodeVersion, targetPlatform, targetArch) {
  // https://support.apple.com/en-us/HT201948
  // don't disable macos-x86 because it breaks
  // cross-platform tests on x86 hosts
  // TODO disabe macos-x86 again once we have
  // cross-arch compilation
//  if (targetPlatform === 'macos' &&
//      targetArch === 'x86') return true;
  // official node 0.12 does not compile on arm
  if (/^v?0/.test(nodeVersion) &&
      /^arm/.test(targetArch)) return true;
  // same for node 7 beta
  if (/^v?7/.test(nodeVersion) &&
      /^arm/.test(targetArch)) return true;
  // some obstacles on freebsd
  if (targetPlatform === 'freebsd' &&
      targetArch === 'x86') return true;
  if (/^v?0/.test(nodeVersion) &&
      targetPlatform === 'freebsd') return true;
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
      const short = path.basename(local);
      log.info(`Building ${short}...`);
      await build(nodeVersion, targetArch, local);
      log.info(`Verifying ${short}...`);
      await verify(local);
      log.info(`Uploading ${short}...`);
      const remote = remotePlace({ arch: targetArch,
        nodeVersion, platform: hostPlatform, version });
      try {
        await upload(local, remote);
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
