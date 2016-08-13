import * as system from './system.js';

export function need ({ nodeRange, platform, arch } = {}) {
  nodeRange = system.abiToNodeRange(nodeRange) || 'latest';
  console.log(nodeRange);
}

export { system };
