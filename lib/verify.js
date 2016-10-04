import { plusx } from './chmod.js';
import { spawn } from './spawn.js';

const script = `
  var vm = require('vm');
  var assert = require('assert');
  var text = '(function () { return 42; })';
  var cd, fn, result;
  var modules = process.versions.modules | 0;

  var s1 = new vm.Script(text, { filename: 's1', produceCachedData: true, sourceless: true });
  assert(s1.cachedDataProduced);
  cd = s1.cachedData;

  var kCpuFeaturesOffset, cpuFeatures;
  if (modules === 14) {
  } else
  if (modules === 46 || modules === 48) {
    kCpuFeaturesOffset = 0x0c;
  } else {
    assert(false);
  }

  if (modules >= 46) {
    cpuFeatures = cd.readUInt32LE(kCpuFeaturesOffset);
    assert(cpuFeatures === 0);
  }

  var s2 = new vm.Script(undefined, { filename: 's2', cachedData: cd, sourceless: true });
  fn = s2.runInThisContext();
  result = fn();
  assert.equal(result, 42);

  if (modules === 14) {
  } else
  if (modules === 46 || modules === 48) {
    var paddedPayloadOffset = 0x48; // see SerializedCodeData::Payload()
    var index = paddedPayloadOffset + 10;
    cd[index] ^= 0xf0;
    var s3 = new vm.Script(undefined, { filename: 's3', cachedData: cd, sourceless: true });
    assert(s3.cachedDataRejected);
  } else {
    assert(false);
  }

  var s4 = new vm.Script(text, { filename: 's4', produceCachedData: true });
  assert(s4.cachedDataProduced);
  cd = s4.cachedData;

  cpuFeatures = cd.readUInt32LE(kCpuFeaturesOffset);
  assert(cpuFeatures !== 0);
`;

export async function verify (local) {
  await plusx(local);
  await spawn(local, [ '-e', script ]);
}
