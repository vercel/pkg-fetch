import fs from 'fs-extra';
import path from 'path';

import { hostPlatform, targetArchs } from './system';
import { localPlace, remotePlace } from './places';
import { log } from './log';
import { Cloud } from './cloud';
import build from './build';
import patchesJson from '../patches/patches.json';
import { verify } from './verify';
import { version } from '../package.json';
import { getMajor } from './get-major';

const cloud = new Cloud({ owner: 'zeit', repo: 'pkg-fetch' });

export function dontBuild(
  nodeVersion: string,
  targetPlatform: string,
  targetArch: string
) {
  // binaries are not provided for x86 anymore
  if (targetPlatform !== 'win' && targetArch === 'x86') {
    return true;
  }

  // https://support.apple.com/en-us/HT201948
  // don't disable macos-x86 because it is not possible
  // to cross-compile for x86 from macos otherwise
  const major = getMajor(nodeVersion);

  // node 0.12 does not compile on arm
  if (/^arm/.test(targetArch) && major === 0) return true;
  if (targetPlatform === 'freebsd' && major < 4) return true;
  if (targetPlatform === 'alpine' && (targetArch !== 'x64' || major < 6))
    return true;

  return false;
}

export async function main() {
  const distFolder = path.join(__dirname, '../dist');

  if (!process.env.GITHUB_TOKEN) {
    log.warn('No github credentials. Upload skipped!');
    log.info(`Local destination: ${distFolder}`);
  }

  for (const nodeVersion in patchesJson) {
    if (!patchesJson[nodeVersion as keyof typeof patchesJson]) {
      continue;
    }

    for (const targetArch of targetArchs) {
      if (dontBuild(nodeVersion, hostPlatform, targetArch)) continue;

      const local = localPlace({
        from: 'built',
        arch: targetArch,
        nodeVersion,
        platform: hostPlatform,
        version,
      });

      const remote = remotePlace({
        arch: targetArch,
        nodeVersion,
        platform: hostPlatform,
        version,
      });

      const short = path.basename(local);

      if (process.env.GITHUB_TOKEN) {
        if (await cloud.alreadyUploaded(remote)) continue;
      }

      log.info(`Building ${short}...`);
      await build(nodeVersion, targetArch, local);

      log.info(`Verifying ${short}...`);
      await verify(local);

      if (process.env.GITHUB_TOKEN) {
        log.info(`Uploading ${short}...`);
        try {
          await cloud.upload(local, remote);
        } catch (error) {
          // TODO catch only network errors
          if (!error.wasReported) log.error(error);
          log.info('Meanwhile i will continue making binaries');
        }
      } else {
        log.info(`Expected asset name: ${remote.name}`);

        await fs.mkdirp(distFolder);
        await fs.move(local, path.join(distFolder, remote.name));
      }
    }
  }
}

if (!module.parent) {
  main().catch((error) => {
    if (!error.wasReported) log.error(error);
    process.exit(2);
  });
}
