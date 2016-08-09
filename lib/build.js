import { arch, platform, targets } from './system.js';
import chipo from 'child-process-promise';
import chalk from 'chalk';
import { localPath } from './places.js';
import mkdirp from 'mkdirp-promise';
import patchesJson from '../patches/patches.json';
import path from 'path';
import rimraf from 'rimraf-promise';
import { version } from '../package.json';

const buildPath = path.resolve(__dirname, '../temp');
const patchesPath = path.resolve(__dirname, '../patches');

async function main () {
  for (const nodeVersion in patchesJson) {
    for (const target of targets) {
      await rimraf(buildPath);
      await mkdirp(buildPath);

      await chipo.spawn('git',
        [ 'clone', 'https://github.com/nodejs/node', 'node' ],
        { stdio: 'inherit', cwd: buildPath });

      await chipo.spawn('git',
        [ 'reset', '--hard', nodeVersion ],
        { stdio: 'inherit', cwd: buildPath + '/node' });

      // const patches = patchesJson[nodeVersion];
    }
  }
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
