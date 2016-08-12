import chipo from 'child-process-promise';

export async function spawn (...args) {
  return chipo.spawn(...args);
}
