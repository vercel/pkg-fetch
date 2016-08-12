import uniqueTempDir from 'unique-temp-dir';

export function tempPath (...args) {
  return uniqueTempDir(...args);
}
