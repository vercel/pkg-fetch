#!/usr/bin/env node

import { log } from './log.js';
import minimist from 'minimist';
import { need } from './index.js';

async function main () {
  const argv = minimist(process.argv.slice(2), {
    boolean: [ 'f', 'b' ],
    string: [ 'n', 'p', 'a' ]
  });
  const nodeRange = argv.n || argv._.shift();
  const platform = argv.p || argv._.shift();
  const arch = argv.a || argv._.shift();
  const forceFetch = argv.f;
  const forceBuild = argv.b;
  const local = await need({ nodeRange, platform,
    arch, forceFetch, forceBuild });
  log.info(local);
}

main().catch((error) => {
  if (!error.wasReported) log.error(error);
  process.exit(2);
});
