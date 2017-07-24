/* eslint-disable camelcase */

import { log, wasReported } from './log.js';
import assert from 'assert';
import fs from 'fs';
import progress from 'request-progress';
import request from 'request';

export class GitHub {
  constructor ({ owner, repo }) {
    this.owner = owner;
    this.repo = repo;
    const { GITHUB_USERNAME, GITHUB_PASSWORD } = process.env;
    const auth = { user: GITHUB_USERNAME, pass: GITHUB_PASSWORD };
    this.request = request.defaults({
      auth: auth.user ? auth : undefined,
      headers: { 'User-Agent': `${this.owner}/${this.repo}/${GITHUB_USERNAME}` },
      timeout: 30 * 1000
    });
  }

  getRelease (tag) {
    return new Promise((resolve, reject) => {
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/releases/tags/${tag}`;
      this.request(url, (error, response, body) => {
        if (error) return reject(wasReported(error.message));
        const release = JSON.parse(body);
        const { message } = release;
        if (message === 'Not Found') return resolve(undefined);
        if (message) return reject(wasReported(message));
        resolve(release);
      });
    });
  }

  getReleaseDraft (tag) {
    return new Promise((resolve, reject) => {
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/releases`;
      this.request(url, (error, response, body) => {
        if (error) return reject(wasReported(error.message));
        // here we use `get release by tag` endpoint
        // because draft releases are really `untagged`.
        // seems that `get release by tag` is for non-drafts.
        // hence listing all releases and looking through them
        const releases = JSON.parse(body);
        if (releases.message) return reject(wasReported(releases.message));
        const found = releases.filter(({ tag_name }) => tag_name === tag); // eslint-disable-line camelcase
        assert(found.length <= 1);
        if (!found.length) return resolve(undefined);
        resolve(found[0]);
      });
    });
  }

  createRelease (tag) {
    return new Promise((resolve, reject) => {
      const form = JSON.stringify({
        tag_name: tag,
        target_commitish: 'master', // TODO maybe git rev-parse HEAD
        name: tag,
        draft: true,
        prerelease: true
      });
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/releases`;
      this.request.post(url, { form }, (error, response, body) => {
        if (error) return reject(wasReported(error.message));
        const release = JSON.parse(body);
        if (release.message) return reject(wasReported(release.message));
        resolve(release);
      });
    });
  }

  uploadAsset (file, release, name) {
    assert(!(/[\\/]/.test(name)));
    return new Promise((resolve, reject) => {
      fs.stat(file, (error, stat) => {
        if (error) return reject(error);
        const headers = {
          'Content-Length': stat.size,
          'Content-Type': 'application/octet-stream'
        };
        const rs = fs.createReadStream(file);
        const subst = `?name=${name}`;
        const url = release.upload_url.replace(/\{\?name,label\}/, subst);
        const req = this.request.post(url, {
          headers, timeout: 30 * 60 * 1000
        }, (error2, response, body) => {
          if (error2) return reject(wasReported(error2.message));
          const asset = JSON.parse(body);
          const { errors } = asset;
          if (errors && errors[0]) return reject(wasReported(errors[0].code));
          if (asset.message) return reject(wasReported(asset.message));
          resolve(asset);
        });
        rs.pipe(req);
      });
    });
  }

  downloadUrl (url, file, short) {
    log.enableProgress(short);
    log.showProgress(0);
    return new Promise((resolve, reject) => {
      const headers = { Accept: 'application/octet-stream' };
      const ws = fs.createWriteStream(file);
      let result;
      const req = progress(this.request.get(url, {
        headers
      }, (error, response) => {
        if (error) {
          log.disableProgress();
          return reject(wasReported(error.message));
        }
        if (response.statusCode !== 200) {
          log.disableProgress();
          const message = `${response.statusCode} ${response.body}`;
          return reject(wasReported(message, url));
        }
        result = response;
      }));
      req.on('progress', (state) => {
        let p;
        if (state.size && state.size.transferred && state.size.total) {
          p = state.size.transferred / state.size.total;
        } else {
          p = state.percentage;
        }
        log.showProgress(p * 100);
      });
      req.pipe(ws);
      ws.on('close', () => {
        log.showProgress(100);
        log.disableProgress();
        resolve(result);
      }).on('error', (error) => {
        log.disableProgress();
        reject(wasReported(error.message));
      });
    });
  }

  async tryDirectly (tag, name, file, short) {
    try {
      const url = `https://github.com/${this.owner}/${this.repo}/releases/download/${tag}/${name}`;
      await this.downloadUrl(url, file, short);
      return true;
    } catch (error) {
      log.info('Asset not found by direct link:', JSON.stringify({ tag, name }));
      return false;
    }
  }
}
