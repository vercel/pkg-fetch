import yargs from 'yargs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from './log';
import { version } from '../package.json';
import { nodeBinarySortFunction } from './utils';

async function main() {
  const { argv } = yargs
    .option('input', { alias: 'i', default: 'shas.txt', type: 'string' })
    .version(version)
    .alias('v', 'version')
    .help()
    .alias('h', 'help');

  const shaFileContent = readFileSync(argv.input).toString();
  const shaMap: { [id: string]: string } = {};
  for (const line of shaFileContent.split('\n')) {
    // Expect line to be of the form
    // <sha> node-v<version>-host-arch
    const lineParts = line.split(/\s+/);
    if (lineParts.length === 2) {
      // eslint-disable-next-line prefer-destructuring
      shaMap[lineParts[1]] = lineParts[0];
    }
  }

  // Sort map
  const sortedShaMap: { [id: string]: string } = {};
  for (const nodeVersion of Object.keys(shaMap).sort(nodeBinarySortFunction)) {
    sortedShaMap[nodeVersion] = shaMap[nodeVersion];
  }

  writeFileSync(join(__dirname, '../lib/expected-shas.json'),
                `${JSON.stringify(sortedShaMap, null, 2)}\n`);
}

main().catch((error) => {
  if (!error.wasReported) log.error(error);
  process.exit(2);
});
