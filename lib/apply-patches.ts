#!/usr/bin/env node

import yargs from 'yargs';

import { log } from './log';
import { getNodeVersion } from './index';
import { version } from '../package.json';
import { fetchExtractApply, prepBuildPath } from './build';

async function applyPatchesOnVersion(nodeRange: string, quietExtraction = false) {
  await prepBuildPath();
  await fetchExtractApply(getNodeVersion(nodeRange), quietExtraction);
}

async function main() {
  const { argv } = yargs
    .option('node-range', { alias: 'n', default: 'latest', type: 'string' })
    .option('quiet-extraction', { alias: 'q', type: 'boolean' })
    .version(version)
    .alias('v', 'version')
    .help()
    .alias('h', 'help');

  const {
    'node-range': nodeRange,
    'quiet-extraction': quietExtraction,
  } = argv;

  await applyPatchesOnVersion(nodeRange, quietExtraction);
}

main().catch((error) => {
  if (!error.wasReported) log.error(error);
  process.exit(2);
});
