#!/usr/bin/env node

import yargs from 'yargs';

import { hostPlatform, hostArch } from './system';
import { log } from './log';
import { need } from './index';
import { verify } from './verify';
import { version } from '../package.json';

async function main() {
  const { argv } = yargs
    .env('PKG_FETCH_OPTION_')
    .option('node-range', { alias: 'n', default: 'latest', type: 'string' })
    .option('platform', { alias: 'p', default: hostPlatform, type: 'string' })
    .option('arch', { alias: 'a', default: hostArch, type: 'string' })
    .option('test', { alias: 't', type: 'boolean' })
    .option('force-fetch', {
      alias: 'f',
      type: 'boolean',
    })
    .option('force-build', {
      alias: 'b',
      type: 'boolean',
    })
    .conflicts('force-fetch', 'force-build')
    .option('output', { alias: 'o', type: 'string' })
    .version(version)
    .alias('v', 'version')
    .help()
    .alias('h', 'help');

  const {
    'node-range': nodeRange,
    platform,
    arch,
    test,
    'force-fetch': forceFetch,
    'force-build': forceBuild,
    output,
  } = argv;

  const local = await need({
    nodeRange,
    platform,
    arch,
    forceFetch,
    forceBuild,
    output,
  });

  log.info(local);

  if (test) {
    await verify(local);
  }
}

main().catch((error) => {
  if (!error.wasReported) log.error(error);
  process.exit(2);
});
