/* eslint-disable no-underscore-dangle, no-console */

import Progress from 'progress';
import assert from 'assert';
import chalk from 'chalk';

class Log {
  debugMode = false;

  private bar?: Progress;

  private lines(lines?: string[] | string) {
    if (lines === undefined) {
      return;
    }

    if (!Array.isArray(lines)) {
      console.log(`  ${lines}`);
      return;
    }

    for (const line of lines) {
      console.log(`  ${line}`);
    }
  }

  debug(text: string, lines?: string[] | string) {
    if (!this.debugMode) {
      return;
    }

    console.log(`> ${chalk.green('[debug]')} ${text}`);
    this.lines(lines);
  }

  info(text: string, lines?: string[] | string) {
    console.log(`> ${text}`);
    this.lines(lines);
  }

  warn(text: string, lines?: string[] | string) {
    console.log(`> ${chalk.blue('Warning')} ${text}`);
    this.lines(lines);
  }

  error(text: Error | string, lines?: string[] | string) {
    const message = text instanceof Error ? text.stack : text;
    console.log(`> ${chalk.red('Error!')} ${message}`);
    this.lines(lines);
  }

  enableProgress(text: string) {
    assert(!this.bar);

    text += ' '.repeat(35 - text.length);
    this.bar = new Progress(`  ${text} [:bar] :percent`, {
      stream: process.stdout,
      width: 20,
      complete: '=',
      incomplete: ' ',
      total: 100,
    });
  }

  showProgress(percentage: number) {
    if (!this.bar) {
      return;
    }

    this.bar.update(percentage / 100);
  }

  disableProgress() {
    if (!this.bar) {
      return;
    }

    // avoid empty line
    if (!this.bar.complete) {
      this.bar.terminate();
    }

    delete this.bar;
  }
}

export const log = new Log();

class ReportedError extends Error {
  name = 'ReportedError';

  wasReported = true;
}

export function wasReported(error?: string, lines?: string[] | string | string) {
  let reportedError = new ReportedError('No message');

  if (typeof error === 'string') {
    log.error(error, lines);
    reportedError = new ReportedError(error);
  }

  return reportedError;
}
