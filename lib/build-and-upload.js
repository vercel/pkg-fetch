import { localPlace, remotePlace } from './places.js';
import build from './build.js';
import chalk from 'chalk';
import patchesJson from '../patches/patches.json';
import { targets } from './system.js';
import upload from './upload.js';
import { version } from '../package.json';

const { platform } = process;

function isBrokenBuild(nodeVersion, target) {
  if (/^v?0/.test(nodeVersion) &&
      /^arm/.test(target)) return true;
  return false;
}

async function main () {
  for (const nodeVersion in patchesJson) {
    for (const target of targets) {
      if (isBrokenBuild(nodeVersion, target)) continue;
      const local = localPlace({ arch: target, nodeVersion, platform, version });
      console.error(`> ${chalk.yellow('Building')} ${nodeVersion}-${target}`);
      await build({ copyDest: local, nodeVersion, target });
      console.error(`> ${chalk.yellow('Uploading')} ${local}`);
      const remote = remotePlace({ arch: target, nodeVersion, platform, version });
      await upload(local, remote, version);
    }
  }
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
