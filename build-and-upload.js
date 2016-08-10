import build from './lib/build.js';
import chalk from 'chalk';
import patchesJson from './patches/patches.json';
import { targets } from './lib/system.js';

async function main () {
  for (const nodeVersion in patchesJson) {
    for (const target of targets) {
      await build(nodeVersion, target);
    }
  }
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
