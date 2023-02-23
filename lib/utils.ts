import fetch from 'node-fetch';
import crypto from 'crypto';
import fs from 'fs-extra';
import httpsProxyAgent from 'https-proxy-agent';
import type { HttpsProxyAgentOptions } from 'https-proxy-agent';
import path from 'path';
import { spawnSync, SpawnSyncOptions } from 'child_process';
import stream from 'stream';
import url from 'url';

import { log, wasReported } from './log';

function getProxyHost() {
  return process.env.HTTPS_PROXY ??
  process.env.https_proxy ??
  process.env.HTTP_PROXY ??
  process.env.http_proxy;
}

function getProxyCert() {
  return process.env.HTTPS_PROXY_CERT ?? process.env.https_proxy_cert;
}

function getProxyKey() {
  return process.env.HTTPS_PROXY_KEY ?? process.env.https_proxy_key;
}

function getProxyDetails() {
  const proxyHost = getProxyHost();

  let proxy: HttpsProxyAgentOptions | undefined;

  if (proxyHost) {
    proxy = url.parse(proxyHost);
    const certPath = getProxyCert();
    if (certPath) {
      proxy.cert = fs.readFileSync(certPath);
    }
    const keyPath = getProxyKey();
    if (keyPath) {
      proxy.key = fs.readFileSync(keyPath);
    }
  }
  return proxy;
}

export async function downloadUrl(urlToDownload: string, file: string): Promise<void> {
  log.enableProgress(path.basename(file));
  log.showProgress(0);

  const proxy = getProxyDetails();

  const res = await fetch(
    urlToDownload,
    proxy ? { agent: httpsProxyAgent(proxy) } : undefined
  );

  if (!res.ok) {
    log.disableProgress();
    throw wasReported(`${res.status}: ${res.statusText}`);
  }

  const tempFile = `${file}.downloading`;
  fs.mkdirpSync(path.dirname(tempFile));
  const ws = fs.createWriteStream(tempFile);

  const totalSize = Number(res.headers.get('content-length'));
  let currentSize = 0;

  res.body.on('data', (chunk: Buffer) => {
    if (totalSize != null && totalSize !== 0) {
      currentSize += chunk.length;
      log.showProgress((currentSize / totalSize) * 100);
    }
  });
  res.body.pipe(ws);

  return new Promise<void>((resolve, reject) => {
    stream.finished(ws, (err) => {
      if (err) {
        log.disableProgress();
        fs.rmSync(tempFile);
        reject(wasReported(`${err.name}: ${err.message}`));
      } else {
        log.showProgress(100);
        log.disableProgress();
        fs.moveSync(tempFile, file);
        resolve();
      }
    });
  });
}

export async function hash(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const resultHash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    input.on('error', (e) => {
      reject(e);
    });

    input.on('readable', () => {
      const data = input.read();
      if (data) {
        resultHash.update(data);
      } else {
        resolve(resultHash.digest('hex'));
      }
    });
  });
}

export async function plusx(file: string) {
  const s = await fs.stat(file);
  const newMode = s.mode | 64 | 8 | 1;
  if (s.mode === newMode) return;
  const base8 = newMode.toString(8).slice(-3);
  await fs.chmod(file, base8);
}

export async function spawn(
  command: string,
  args?: ReadonlyArray<string>,
  options?: SpawnSyncOptions
): Promise<void> {
  const { error } = spawnSync(command, args, options);
  if (error) {
    throw error;
  }
}
