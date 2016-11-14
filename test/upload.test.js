/* eslint-disable camelcase */

import LogMock from './log-mock.js';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import test from 'ava';

process.env.GITHUB_USERNAME = 'suppress upload error';

function relative (p) {
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
  delete patchesJson[nodeVersion];
}

for (const nodeVersion in newPatchesJson) {
  patchesJson[nodeVersion] = newPatchesJson[nodeVersion];
}

require('../lib/log.js').log = new LogMock(actions);

require('../lib/temp-path.js').tempPath = function () {
  return path.join(__dirname, '../temp');
};

require('../lib/spawn.js').spawn = function (cmd, args, opts) {
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
  actions.push([ cmd, args.join(' '), JSON.stringify(opts) ].join(' '));
};

require('../lib/spawn.js').progress = function () {
};

require('../lib/verify.js').verify = function () {
  actions.push('verify');
};

require('../lib/copy-file.js').copyFile = function (src, dest) {
  src = relative(src);
  const shortDest = path.basename(path.dirname(dest)) + '/' + path.basename(dest);
  actions.push([ 'copyFile', src, shortDest ].join(' ')); // full dest is flaky
  lastLocal = dest;
};

require('../lib/github.js').getRelease = function (tag) {
  actions.push([ 'getRelease', tag ].join(' '));
  return undefined;
};

require('../lib/github.js').getReleaseDraft = function (tag) {
  actions.push([ 'getReleaseDraft', tag ].join(' '));
  return undefined;
};

require('../lib/github.js').createRelease = function (tag) {
  actions.push([ 'createRelease', tag ].join(' '));
  return { upload_url: 'https://example.com/assets{?name,label}', assets };
};

require('../lib/github.js').uploadAsset = function (local, release, name) {
  assert(local === lastLocal); // test it here. too flaky to push to actions
  actions.push([ 'uploadAsset', JSON.stringify(release), name ].join(' '));
  assets.push({ name });
};

test(async () => {
  if (process.platform !== 'darwin' ||
      process.arch !== 'x64') {
    throw new Error('RUN THE TEST ONLY ON MACOS-X64');
  }

  const { main } = require('../lib/upload.js');
  await main();
  const mustBe = [
    '> Building built-v0.12.15-macos-x64...',
    '> Cloning Node.js repository from GitHub...',
    'git clone --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../temp"}',
    '> Checking out v0.12.15',
    'git --work-tree . reset --hard v0.12.15 {"cwd":"../temp/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/backport.R00000.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24002.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24204.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24262.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24266.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24523.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24543.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24639.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24642.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24643.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24644.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24824.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R25039.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R25444.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/node.v0.12.15.patch {"cwd":"../temp/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu x64 {"cwd":"../temp/node"}',
    'make  {"cwd":"../temp/node"}',
    'copyFile ../temp/node/out/Release/node v1337.2/built-v0.12.15-macos-x64',
    '> Verifying built-v0.12.15-macos-x64...',
    'verify',
    '> Uploading built-v0.12.15-macos-x64...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[]} uploaded-v1337.2-node-v0.12.15-macos-x64',
    '> Building built-v0.12.15-macos-x86...',
    '> Cloning Node.js repository from GitHub...',
    'git clone --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../temp"}',
    '> Checking out v0.12.15',
    'git --work-tree . reset --hard v0.12.15 {"cwd":"../temp/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/backport.R00000.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24002.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24204.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24262.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24266.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24523.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24543.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24639.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24642.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24643.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24644.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R24824.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R25039.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/backport.R25444.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/node.v0.12.15.patch {"cwd":"../temp/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu ia32 {"cwd":"../temp/node"}',
    'make  {"cwd":"../temp/node"}',
    'copyFile ../temp/node/out/Release/node v1337.2/built-v0.12.15-macos-x86',
    '> Verifying built-v0.12.15-macos-x86...',
    'verify',
    '> Uploading built-v0.12.15-macos-x86...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"}]} uploaded-v1337.2-node-v0.12.15-macos-x86',
    '> Building built-v4.4.7-macos-x64...',
    '> Cloning Node.js repository from GitHub...',
    'git clone --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../temp"}',
    '> Checking out v4.4.7',
    'git --work-tree . reset --hard v4.4.7 {"cwd":"../temp/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/backport.R32768.v8=4.5.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/node.v4.4.7.patch {"cwd":"../temp/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu x64 {"cwd":"../temp/node"}',
    'make  {"cwd":"../temp/node"}',
    'copyFile ../temp/node/out/Release/node v1337.2/built-v4.4.7-macos-x64',
    '> Verifying built-v4.4.7-macos-x64...',
    'verify',
    '> Uploading built-v4.4.7-macos-x64...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"},{"name":"uploaded-v1337.2-node-v0.12.15-macos-x86"}]} uploaded-v1337.2-node-v4.4.7-macos-x64',
    '> Building built-v4.4.7-macos-x86...',
    '> Cloning Node.js repository from GitHub...',
    'git clone --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../temp"}',
    '> Checking out v4.4.7',
    'git --work-tree . reset --hard v4.4.7 {"cwd":"../temp/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/backport.R32768.v8=4.5.patch {"cwd":"../temp/node"}',
    'patch -p1 -i ../patches/node.v4.4.7.patch {"cwd":"../temp/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu ia32 {"cwd":"../temp/node"}',
    'make  {"cwd":"../temp/node"}',
    'copyFile ../temp/node/out/Release/node v1337.2/built-v4.4.7-macos-x86',
    '> Verifying built-v4.4.7-macos-x86...',
    'verify',
    '> Uploading built-v4.4.7-macos-x86...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"},{"name":"uploaded-v1337.2-node-v0.12.15-macos-x86"},{"name":"uploaded-v1337.2-node-v4.4.7-macos-x64"}]} uploaded-v1337.2-node-v4.4.7-macos-x86',
    '> Building built-v6.3.1-macos-x64...',
    '> Cloning Node.js repository from GitHub...',
    'git clone --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../temp"}',
    '> Checking out v6.3.1',
    'git --work-tree . reset --hard v6.3.1 {"cwd":"../temp/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/node.v6.3.1.patch {"cwd":"../temp/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu x64 --without-inspector {"cwd":"../temp/node"}',
    'make  {"cwd":"../temp/node"}',
    'copyFile ../temp/node/out/Release/node v1337.2/built-v6.3.1-macos-x64',
    '> Verifying built-v6.3.1-macos-x64...',
    'verify',
    '> Uploading built-v6.3.1-macos-x64...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"},{"name":"uploaded-v1337.2-node-v0.12.15-macos-x86"},{"name":"uploaded-v1337.2-node-v4.4.7-macos-x64"},{"name":"uploaded-v1337.2-node-v4.4.7-macos-x86"}]} uploaded-v1337.2-node-v6.3.1-macos-x64',
    '> Building built-v6.3.1-macos-x86...',
    '> Cloning Node.js repository from GitHub...',
    'git clone --bare --progress https://github.com/nodejs/node node/.git {"cwd":"../temp"}',
    '> Checking out v6.3.1',
    'git --work-tree . reset --hard v6.3.1 {"cwd":"../temp/node"}',
    '> Applying patches',
    'patch -p1 -i ../patches/node.v6.3.1.patch {"cwd":"../temp/node"}',
    '> Compiling Node.js from sources...',
    './configure --dest-cpu ia32 --without-inspector {"cwd":"../temp/node"}',
    'make  {"cwd":"../temp/node"}',
    'copyFile ../temp/node/out/Release/node v1337.2/built-v6.3.1-macos-x86',
    '> Verifying built-v6.3.1-macos-x86...',
    'verify',
    '> Uploading built-v6.3.1-macos-x86...',
    'getRelease v1337.2',
    'getReleaseDraft v1337.2',
    'createRelease v1337.2',
    'uploadAsset {"upload_url":"https://example.com/assets{?name,label}","assets":[{"name":"uploaded-v1337.2-node-v0.12.15-macos-x64"},{"name":"uploaded-v1337.2-node-v0.12.15-macos-x86"},{"name":"uploaded-v1337.2-node-v4.4.7-macos-x64"},{"name":"uploaded-v1337.2-node-v4.4.7-macos-x86"},{"name":"uploaded-v1337.2-node-v6.3.1-macos-x64"}]} uploaded-v1337.2-node-v6.3.1-macos-x86'
  ];
  for (let i = 0; i < actions.length; i += 1) {
    assert.equal(actions[i], mustBe[i]);
  }
  assert.equal(actions.length, mustBe.length);
});
