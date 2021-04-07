import axios, { AxiosError } from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import stream from 'stream';

import { log, wasReported } from './log';

export async function downloadUrl(url: string, file: string) {
  log.enableProgress(path.basename(file));
  log.showProgress(0);

  const tempFile = `${file}.downloading`;

  fs.mkdirpSync(path.dirname(tempFile));

  const ws = fs.createWriteStream(tempFile);

  return axios
    .get(url, { responseType: 'stream' })
    .then(({ data, headers }) => {
      const totalSize = headers['content-length'];
      let currentSize = 0;

      data.on('data', (chunk: string) => {
        if (totalSize != null && totalSize !== 0) {
          currentSize += chunk.length;
          log.showProgress((currentSize / totalSize) * 100);
        }
      });
      data.pipe(ws);

      return promisify(stream.finished)(ws).then(() => {
        log.showProgress(100);
        log.disableProgress();
        fs.moveSync(tempFile, file);
      });
    })
    .catch((e: AxiosError) => {
      log.disableProgress();
      fs.rmSync(tempFile);
      if (e.response) {
        throw wasReported(`${e.response.status}`);
      } else {
        throw wasReported(e.message);
      }
    });
}
