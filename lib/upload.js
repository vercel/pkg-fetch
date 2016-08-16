import { hostPlatform, targetArchs } from './system.js';
import { localPlace, remotePlace } from './places.js';
import build from './build.js';
import log from './log.js';
import patchesJson from '../patches/patches.json';
import { upload } from './cloud.js';
import { version } from '../package.json';

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
      log.info('Building', `${nodeVersion}-${targetArch}`);
      await build(nodeVersion, targetArch, local);
      log.info('Uploading', local);
      const remote = remotePlace({ arch: targetArch, nodeVersion, platform: hostPlatform, version });
      await upload(local, remote);
    }
  }
}

if (!module.parent) {
  main().catch((error) => {
    log.error(error);
    process.exit(2);
  });
}
