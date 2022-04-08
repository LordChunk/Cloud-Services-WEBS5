const createError = require('http-errors')

class RequestHandler {
  constructor(circuitBreaker) {
    this.circuitBreaker = circuitBreaker;
  }

  send(method, endpoint) {
    return (req, res, next) => {
      this.circuitBreaker.fire(method, endpoint, req.body)
        .then(response => res.status(response.status).json(response.data))
        .catch(error => next(createError(error.response.status, error.message)));
    }
  }

  static createNewRequestHandler(circuitBreaker) {
    return new RequestHandler(circuitBreaker);
  }
}

module.exports = RequestHandler;