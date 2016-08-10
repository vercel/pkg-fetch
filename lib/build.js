import { platform, targets } from './system.js';
import chipo from 'child-process-promise';
import chalk from 'chalk';
import { localPath } from './places.js';
import mkdirp from 'mkdirp-promise';
import patchesJson from '../patches/patches.json';
import path from 'path';
import rimraf from 'rimraf-promise';
import { version } from '../package.json';

const buildPath = path.resolve(__dirname, '../temp');
const nodePath = path.join(buildPath, 'node');
const patchesPath = path.resolve(__dirname, '../patches');
const windows = platform === 'win32';

async function compileOnWindows (target) {
  const args = [];
  args.push('/c', 'vcbuild.bat', target, 'nosign');
  await chipo.spawn('cmd', args,
    { stdio: 'inherit', cwd: nodePath });
}

async function compileOnUnix (target) {
  const args = [];
  const cpu = { x86: 'ia32', x64: 'x64',
    armv6: 'arm', armv7: 'arm' }[target];
  args.push('--dest-cpu', cpu);
  await chipo.spawn('./configure', args,
    { stdio: 'inherit', cwd: nodePath });
  await chipo.spawn('make',
    { stdio: 'inherit', cwd: nodePath });
}

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
        { stdio: 'inherit', cwd: nodePath });

      const patches = patchesJson[nodeVersion];
      for (const patch of patches) {
        console.log(`> ${chalk.yellow('Applying patch')} ${patch}`);
        const patchPath = path.join(patchesPath, patch);
        await chipo.spawn('patch',
          [ '-p1', '-i', patchPath ],
          { stdio: 'inherit', cwd: nodePath });
      }

      let outputBinary;
      if (windows) {
        outputBinary = await compileOnWindows(target);
      } else {
        outputBinary = await compileOnUnix(target);
      }

      // TODO place to ~/.pkg-cache
    }
  }
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
