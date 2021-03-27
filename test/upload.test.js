/* eslint-disable camelcase */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import test from 'ava';
import LogMock from './log-mock';

process.env.GITHUB_USERNAME = 'suppress upload error';

function relative(p) {
  const p2 = path.relative(__dirname, p);
  return p2.replace(/\\/g, '/');
}

const actions = [];
let lastLocal;
const assets = [];

require('../package.json').version = '1337.2.3';

const patchesJson = require('../patches/patches.json');
const newPatchesJson = require('./patches.json');

for (const nodeVersion in patchesJson) {
  if (patchesJson[nodeVersion]) {
    delete patchesJson[nodeVersion];
  }
}

for (const nodeVersion in newPatchesJson) {
  if (newPatchesJson[nodeVersion]) {
    patchesJson[nodeVersion] = newPatchesJson[nodeVersion];
  }
}

require('../lib-es5/log.js').log = new LogMock(actions);

require('../lib-es5/spawn.js').spawn = (cmd, args, opts) => {
  assert(opts);
  assert(opts.cwd);
  if (cmd === 'git' && args[0] === 'clone') {
    fs.mkdirSync(path.join(opts.cwd, 'node'));
  }
  if (cmd === 'make') {
    fs.mkdirSync(path.join(opts.cwd, 'out'));
    fs.mkdirSync(path.join(opts.cwd, 'out', 'Release'));
    fs.writeFileSync(path.join(opts.cwd, 'out', 'Release', 'node'), 'ELF');
  }
  if (cmd === 'cmd') {
    fs.mkdirSync(path.join(opts.cwd, 'Release'));
    fs.writeFileSync(path.join(opts.cwd, 'Release', 'node.exe'), 'MZ');
  }
  if (cmd === 'patch') {
    args[args.length - 1] = relative(args[args.length - 1]);
  }
  if (opts.cwd) {
    opts.cwd = relative(opts.cwd);
  }
  actions.push([cmd, args.join(' '), JSON.stringify(opts)].join(' '));
};

require('../lib-es5/spawn.js').progress = () => {};

require('../lib-es5/verify.js').verify = () => {
  actions.push('verify');
};

require('../lib-es5/copy-file.js').copyFile = (src, dest) => {
  src = relative(src);
  const shortDest = `${path.basename(path.dirname(dest))}/${path.basename(
    dest
  )}`;
  actions.push(['copyFile', src, shortDest].join(' ')); // full dest is flaky
  lastLocal = dest;
};

require('../lib-es5/github.js').GitHub = class {
  getRelease(tag) {
    actions.push(['getRelease', tag].join(' '));
    return undefined;
  }

  getReleaseDraft(tag) {
    actions.push(['getReleaseDraft', tag].join(' '));
    return undefined;
  }

  createRelease(tag) {
    actions.push(['createRelease', tag].join(' '));
    return { upload_url: 'https://example.com/assets{?name,label}', assets };
  }

  uploadAsset(local, release, name) {
    assert(local === lastLocal); // test it here. too flaky to push to actions
    actions.push(['uploadAsset', JSON.stringify(release), name].join(' '));
    assets.push({ name });
  }
};

test('upload', async (t) => {
  if (process.platform !== 'darwin' || process.arch !== 'x64') {
    throw new Error('RUN THE TEST ONLY ON MACOS-X64');
  }

  process.env.MAKE_JOB_COUNT = 1;
  // eslint-disable-next-line global-require
  const { main } = require('../lib-es5/upload');

  await main();
  const mustBe = [
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    '> Building built-v0.12.15-macos-x64...',
    '> Cloning Node.js repository from GitHub...',
    'git clone -b v0.12.15 --depth 1 --single-branch --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../precompile"}',
    '> Checking out v0.12.15',
    'git --work-tree . reset --hard v0.12.15 {"cwd":"../precompile/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/backport.R00000.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24002.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24204.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24262.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24266.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24523.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24543.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24639.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24642.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24643.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24644.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R24824.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R25039.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/backport.R25444.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/node.v0.12.15.patch {"cwd":"../precompile/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu x64 {"cwd":"../precompile/node"}',
    'make -j 1 {"cwd":"../precompile/node"}',
    'copyFile ../precompile/node/out/Release/node v1337.2/built-v0.12.15-macos-x64',
    '> Verifying built-v0.12.15-macos-x64...',
    'verify',
    '> Uploading built-v0.12.15-macos-x64...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[]} uploaded-v1337.2-node-v0.12.15-macos-x64',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    '> Building built-v4.4.7-macos-x64...',
    '> Cloning Node.js repository from GitHub...',
    'git clone -b v4.4.7 --depth 1 --single-branch --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../precompile"}',
    '> Checking out v4.4.7',
    'git --work-tree . reset --hard v4.4.7 {"cwd":"../precompile/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/backport.R32768.v8=4.5.patch {"cwd":"../precompile/node"}',
    'patch -p1 -i ../patches/node.v4.4.7.patch {"cwd":"../precompile/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu x64 {"cwd":"../precompile/node"}',
    'make -j 1 {"cwd":"../precompile/node"}',
    'copyFile ../precompile/node/out/Release/node v1337.2/built-v4.4.7-macos-x64',
    '> Verifying built-v4.4.7-macos-x64...',
    'verify',
    '> Uploading built-v4.4.7-macos-x64...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"}]} uploaded-v1337.2-node-v4.4.7-macos-x64',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    '> Building built-v6.3.1-macos-x64...',
    '> Cloning Node.js repository from GitHub...',
    'git clone -b v6.3.1 --depth 1 --single-branch --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../precompile"}',
    '> Checking out v6.3.1',
    'git --work-tree . reset --hard v6.3.1 {"cwd":"../precompile/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/node.v6.3.1.patch {"cwd":"../precompile/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu x64 --without-inspector {"cwd":"../precompile/node"}',
    'make -j 1 {"cwd":"../precompile/node"}',
    'copyFile ../precompile/node/out/Release/node v1337.2/built-v6.3.1-macos-x64',
    '> Verifying built-v6.3.1-macos-x64...',
    'verify',
    '> Uploading built-v6.3.1-macos-x64...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"},{"name":"uploaded-v1337.2-node-v4.4.7-macos-x64"}]} uploaded-v1337.2-node-v6.3.1-macos-x64',
  ];
  for (let i = 0; i < actions.length; i += 1) {
    t.is(`${actions[i]} [[[${i}]]]`, `${mustBe[i]} [[[${i}]]]`);
  }
  t.is(actions.length, mustBe.length);
});
