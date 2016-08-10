import { localPlace, remotePlace } from './lib/places.js';
import build from './lib/build.js';
import chalk from 'chalk';
import patchesJson from './patches/patches.json';
import { targets } from './lib/system.js';
import upload from './lib/upload.js';
import { version } from './package.json';

const platform = process.platform;

async function main () {
  for (const nodeVersion in patchesJson) {
    for (const target of targets) {
      const local = localPlace({
        arch: target, nodeVersion, platform, version });
      await build({
        copyDest: local, nodeVersion, target });
      const remote = remotePlace({
        arch: target, nodeVersion, platform, version });
      await upload(local, remote);
    }
  }
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
