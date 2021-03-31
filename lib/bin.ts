#!/usr/bin/env node

import yargs from 'yargs';

import { hostPlatform, hostArch } from './system';
import { log } from './log';
import { need } from './index';
import { version } from '../package.json';

async function main() {
  const { argv } = yargs
    .env('PKG_FETCH_OPTION_')
    .option('node-range', { alias: 'n', default: 'latest', type: 'string' })
    .option('platform', { alias: 'p', default: hostPlatform, type: 'string' })
    .option('arch', { alias: 'a', default: hostArch, type: 'string' })
    .option('force-fetch', {
      alias: 'f',
      type: 'boolean',
    })
    .option('force-build', {
      alias: 'b',
      type: 'boolean',
    })
    .conflicts('force-fetch', 'force-build')
    .version(version)
    .alias('v', 'version')
    .help()
    .alias('h', 'help');

  const {
    'node-range': nodeRange,
    platform,
    arch,
    'force-fetch': forceFetch,
    'force-build': forceBuild,
  } = argv;

  const local = await need({
    nodeRange,
    platform,
    arch,
    forceFetch,
    forceBuild,
  });

  log.info(local);
}

main().catch((error) => {
  if (!error.wasReported) log.error(error);
  process.exit(2);
});
