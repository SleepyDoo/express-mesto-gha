class NotFoundErr extends Error {
  constructor(message, ...rest) {
    super(...rest);
    this.status = 404;
    this.message = message;
  }
}

module.exports = NotFoundErr;
