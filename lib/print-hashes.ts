import { EXPECTED_HASHES } from './expected';
import { nodeBinarySortFunction } from './utils';

/* eslint-disable no-console */

function main() {
  for (const nodeVersion of Object.keys(EXPECTED_HASHES).sort(nodeBinarySortFunction)) {
    console.log(`${EXPECTED_HASHES[nodeVersion]} ${nodeVersion}`);
  }
}

main();
