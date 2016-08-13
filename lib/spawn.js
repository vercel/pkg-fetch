import chipo from 'child-process-promise';

export function spawn (...args) {
  return chipo.spawn(...args);
}
