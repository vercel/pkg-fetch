declare module 'unique-temp-dir' {
  interface UniqueTempDirOptions {
    create?: boolean;
    length?: number;
    thunk?: boolean;
  }

  function uniqueTempDir(
    options?: UniqueTempDirOptions
  ): string;

  export default uniqueTempDir;
}
