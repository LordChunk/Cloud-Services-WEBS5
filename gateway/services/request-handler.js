const createError = require('http-errors')

class RequestHandler {
  constructor(circuitBreaker) {
    this.circuitBreaker = circuitBreaker;
  }

  /**
   * Function that will send the request to the circuit breaker and handle any errors and return the response
   * @param {String} method  - post or get
   * @param {String} path - path to the endpoint exluding the base url
   * @returns 
   */
  send(method, path) {
    method = method.toLowerCase();

    return (req, res, next) => {
      this.circuitBreaker.fire(method, path, req.body, req.user)
        .then(response => res.status(response.status).json(response.data))
        .catch(error => {
          next(createError(error.response.status || 500, error.message));
        });
    }
  }

  /**
   * Function that will create a new RequestHandler instance
   * @param {CircuitBreaker} circuitBreaker - CircuitBreaker instance for one microservice
   * @returns {RequestHandler} - RequestHandler instance
   */
  static createNewRequestHandler(circuitBreaker) {
    return new RequestHandler(circuitBreaker);
  }
}

module.exports = RequestHandler;