import { arch, platform } from './system.js';
import chipo from 'child-process-promise';
import chalk from 'chalk';
import { localPath } from './places.js';
import mkdirp from 'mkdirp-promise';
import path from 'path';
import { version } from '../package.json';

async function main () {
  const buildPath = path.resolve(__dirname, '../temp');
  await mkdirp(buildPath);

  await chipo.spawn('git',
    [ 'clone', 'https://github.com/nodejs/node', 'node' ],
    { stdio: 'inherit', cwd: buildPath });

  console.log(localPath({
    nodeVersion: 'v6.3.1',
    version, platform, arch
  }));

  await chipo.spawn('git',
    [ 'reset', '--hard', version ],
    { stdio: 'inherit', cwd: buildPath + '/node' });
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
