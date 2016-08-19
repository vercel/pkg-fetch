class LogMock {
  constructor (actions) {
    this.actions = actions;
  }

  info (text) {
    this.actions.push(`> ${text}`);
  }

  warn (text) {
    this.actions.push(`> WARN ${text}`);
  }

  error (text) {
    if (text.message) text = text.message;
    this.actions.push(`> ERR! ${text}`);
  }

  enableProgress () {
  }

  showProgress () {
  }

  disableProgress () {
  }
}

export default LogMock;
