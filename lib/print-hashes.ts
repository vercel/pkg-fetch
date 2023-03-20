import { EXPECTED_HASHES } from './expected';

/* eslint-disable no-console */

function main() {
  for (const nodeVersion of Object.keys(EXPECTED_HASHES).sort()) {
    console.log(`${nodeVersion} ${EXPECTED_HASHES[nodeVersion]}`);
  }
}

main();
