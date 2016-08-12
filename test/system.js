import { system } from '../lib/index.js';
import test from 'ava';

test(async (t) => {
  t.truthy(system.hostPlatform);
  // TODO more?
});
