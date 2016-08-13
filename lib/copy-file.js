import fs from 'fs-promise';

export function copyFile (src, dest) {
  return fs.copy(src, dest);
}
