import chalk from 'chalk';
import minimist from 'minimist';
import { need } from './index.js';

async function main () {
  const argv = minimist(process.argv.slice(2));
  const nodeRange = argv.n || argv._.shift();
  const platform = argv.p || argv._.shift();
  const arch = argv.a || argv._.shift();
  const dontTakeCache = argv.dtc;
  const dontDownload = argv.dd;
  const dontBuild = argv.db;
  const local = await need({ nodeRange, platform, arch,
    dontTakeCache, dontDownload, dontBuild });
  console.log(local);
}

main().catch((error) => {
  console.error(`> ${chalk.red('Error!')} ${error}`);
  process.exit(2);
});
