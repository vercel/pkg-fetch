/* eslint-disable camelcase */

import assert from 'assert';
import fs from 'fs';
import request from 'request';

const OWNER = 'zeit';
const REPO = 'pkg-cache';
const { GITHUB_USERNAME, GITHUB_PASSWORD } = process.env;
const auth = { user: GITHUB_USERNAME, pass: GITHUB_PASSWORD };
const request2 = request.defaults({
  auth: auth.user ? auth : null,
  headers: { 'User-Agent': `${OWNER}/${REPO}/${GITHUB_USERNAME}` }
});

export function getRelease (tag) {
  return new Promise((resolve, reject) => {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/releases`;
    request2(url, (error, response, body) => {
      if (error) return reject(error);
      // we cannot use `get release by tag` endpoint here
      // because draft releases are really `untagged`.
      // seems that `get release by tag` is for non-drafts.
      // hence listing all releases and looking through them
      const releases = JSON.parse(body);
      if (releases.message) return reject(new Error(releases.message));
      const found = releases.filter(({ tag_name }) => tag_name === tag); // eslint-disable-line camelcase
      if (found.length > 1) {
        return reject(new Error(`More than one ${tag} release found. Fix it!`));
      }
      if (!found.length) return resolve(null);
      resolve(found[0]);
    });
  });
}

export function createRelease (tag) {
  return new Promise((resolve, reject) => {
    const form = JSON.stringify({
      tag_name: tag,
      target_commitish: 'master', // TODO maybe git rev-parse HEAD
      name: tag,
      draft: true,
      prerelease: true
    });
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/releases`;
    request2.post(url, { form }, (error, response, body) => {
      if (error) return reject(error);
      resolve(JSON.parse(body));
    });
  });
}

export function uploadAsset (file, release, name) {
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
      const req = request2.post(url, { headers }, (error2, response, body) => {
        if (error2) return reject(error2);
        resolve(JSON.parse(body));
      });
      rs.pipe(req);
    });
  });
}

export function downloadAsset (asset, file) {
  return new Promise((resolve, reject) => {
    const headers = { Accept: 'application/octet-stream' };
    const ws = fs.createWriteStream(file);
    const url = asset.url;
    const req = request2.get(url, { headers }, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
    req.pipe(ws);
  });
}
