import { mkdirp, remove } from 'fs-extra';
import { GitHub } from './github.js';
import assert from 'assert';
import { moveFile } from './copy-file.js';
import path from 'path';

function uniqueName (name, names) {
  if (names.indexOf(name) < 0) return name;
  let newName;
  let counter = 0;
  while (true) {
    newName = `${name}-new-${counter}`;
    if (names.indexOf(newName) < 0) return newName;
    counter += 1;
  }
}

export class Cloud {
  constructor ({ owner, repo }) {
    this.gh = new GitHub({ owner, repo });
  }

  async _findRelease (tag) {
    let release = await this.gh.getRelease(tag);
    if (!release) release = await this.gh.getReleaseDraft(tag);
    if (!release) release = await this.gh.createRelease(tag);
    return release;
  }

  async alreadyUploaded (remote) {
    const release = await this._findRelease(remote.tag);
    return release.assets.some(({ name }) => {
      assert(name);
      return remote.name === name;
    });
  }

  async upload (local, remote) {
    const release = await this._findRelease(remote.tag);
    const names = release.assets.map(({ name }) => {
      assert(name);
      return name;
    });
    const name = uniqueName(remote.name, names);
    await this.gh.uploadAsset(local, release, name);
  }

  async uploadMany (items) {
    for (const item of items) {
      const { local, remote } = item;
      await this.upload(local, remote);
    }
  }

  async download (remote, local) {
    const { tag } = remote;
    const tempFile = local + '.downloading';
    await mkdirp(path.dirname(tempFile));
    const short = path.basename(local);
    const ok = await this.gh.tryDirectly(tag, remote.name, tempFile, short);
    if (!ok) {
      let release = await this.gh.getRelease(tag);
      if (!release) release = await this.gh.getReleaseDraft(tag);
      if (!release) return false;
      const assets = release.assets.filter(({ name }) => {
        assert(name);
        return name === remote.name;
      });
      if (!assets.length) return false;
      assert(assets.length === 1);
      const asset = assets[0];
      await this.gh.downloadUrl(asset.url, tempFile, short);
    }
    await remove(local);
    await moveFile(tempFile, local);
    await remove(tempFile);
    return true;
  }

  async downloadMany (items) {
    for (const item of items) {
      const { remote, local } = item;
      await this.download(remote, local);
    }
  }
}
