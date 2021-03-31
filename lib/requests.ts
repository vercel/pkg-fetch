import fs from 'fs-extra';
import path from 'path';
import progress from 'request-progress';
import request from 'request';

import { log, wasReported } from './log';

export async function downloadUrl(url: string, file: string) {
  log.enableProgress(path.basename(file));
  log.showProgress(0);

  const tempFile = `${file}.downloading`;

  fs.mkdirpSync(path.dirname(tempFile));

  return new Promise<request.Response>((resolve, reject) => {
    const headers = { Accept: 'application/octet-stream' };
    const ws = fs.createWriteStream(tempFile);
    let result: request.Response;

    const req = progress(
      request.defaults({ timeout: 30 * 1000 }).get(
        url,
        {
          headers,
        },
        (error, response) => {
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
        }
      )
    );

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

      fs.moveSync(tempFile, file);
      resolve(result);
    }).on('error', (error) => {
      log.disableProgress();
      reject(wasReported(error.message));
    });
  });
}
