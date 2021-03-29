import uniqueTempDir from 'unique-temp-dir';

export function tempPath(...args: Parameters<typeof uniqueTempDir>) {
  return uniqueTempDir(...args);
}
