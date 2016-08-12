import { localPlace, remotePlace } from './places.js';
import { platform, targetArchs } from './system.js';
import build from './build.js';
import chalk from 'chalk';
import patchesJson from '../patches/patches.json';
import upload from './upload.js';
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
      const local = localPlace({ arch: targetArch, nodeVersion, platform, version });
      console.error(`> ${chalk.yellow('Building')} ${nodeVersion}-${targetArch}`);
      await build({ copyDest: local, nodeVersion, targetArch });
      console.error(`> ${chalk.yellow('Uploading')} ${local}`);
      const remote = remotePlace({ arch: targetArch, nodeVersion, platform, version });
      await upload(local, remote, version);
    }
  }
}

if (!module.parent) {
  main().catch((error) => {
    console.error(`> ${chalk.red('Error!')} ${error}`);
    process.exit(2);
  });
}
