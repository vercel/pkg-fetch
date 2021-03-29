import fs from 'fs-extra';

export function copyFile(src: string, dest: string) {
  return fs.copy(src, dest);
}

export function moveFile(src: string, dest: string) {
  return fs.move(src, dest);
}
