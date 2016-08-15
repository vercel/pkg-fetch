import log from './log.js';
import minimist from 'minimist';
import { need } from './index.js';

async function main () {
  const argv = minimist(process.argv.slice(2));
  const nodeRange = argv.n || argv._.shift();
  const platform = argv.p || argv._.shift();
  const arch = argv.a || argv._.shift();
  const dontReadCache = argv.drc;
  const dontDownload = argv.dd;
  const dontBuild = argv.db;
  const local = await need({ nodeRange, platform, arch,
    dontReadCache, dontDownload, dontBuild });
  log.info('Result', local);
}

main().catch((error) => {
  log.error(error);
  process.exit(2);
});
