import * as system from './system.js';

export function need (nodeRangeOrAbi, platform, arch) {
  const nodeRange = system.abiToNodeRange(nodeRangeOrAbi);
  console.log(nodeRange);
}

export { system };
