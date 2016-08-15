import fs from 'fs-promise';

export function copyFile (src, dest) {
  return fs.copy(src, dest);
}

export function moveFile (src, dest) {
  return fs.move(src, dest);
}
