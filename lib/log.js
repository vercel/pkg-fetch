import Progress from 'progress';
import assert from 'assert';

class Log {
  info (text) {
    console.log('> ' + text);
  }

  warn (text) {
    console.log('> ' + text); // TODO warn?
  }

  error (text) {
    console.log('> ' + text); // TODO error?
  }

  enableProgress (text) {
    assert(!this.bar);
    this.bar = new Progress(`    ${text} [:bar] :percent`, {
      width: 20,
      complete: '=',
      incomplete: ' ',
      total: 100
    });
  }

  showProgress (percentage) {
    this.bar.update(percentage / 100);
  }

  disableProgress () {
    assert(this.bar);
    this.bar.update(1);
    this.bar.terminate();
    delete this.bar;
  }
}

export default new Log();
