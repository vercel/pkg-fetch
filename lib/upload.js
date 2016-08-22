import { hostPlatform, targetArchs } from './system.js';
import { localPlace, remotePlace } from './places.js';
import build from './build.js';
import { log } from './log.js';
import patchesJson from '../patches/patches.json';
import path from 'path';
import { upload } from './cloud.js';
import { version } from '../package.json';

function isBrokenBuild (nodeVersion, targetArch) {
  if (/^v?0/.test(nodeVersion) &&
      /^arm/.test(targetArch)) return true;
  return false;
}

export async function main () {
  if (!process.env.GITHUB_USERNAME) {
    throw new Error('No github credentials. Upload will fail!');
  }

  for (const nodeVersion in patchesJson) {
    for (const targetArch of targetArchs) {
      if (isBrokenBuild(nodeVersion, targetArch)) continue;
      const local = localPlace({ arch: targetArch, nodeVersion, platform: hostPlatform, version });
      const short = path.basename(local);
      log.info(`Building ${short}...`);
      await build(nodeVersion, targetArch, local);
      log.info(`Uploading ${short}...`);
      const remote = remotePlace({ arch: targetArch, nodeVersion, platform: hostPlatform, version });
      try {
        await upload(local, remote);
      } catch (error) {
        // TODO catch only network errors
        log.error(error);
        log.info('Meanwhile i will continue making binaries');
      }
    }
  }
}

if (!module.parent) {
  main().catch((error) => {
    log.error(error);
    process.exit(2);
  });
}
