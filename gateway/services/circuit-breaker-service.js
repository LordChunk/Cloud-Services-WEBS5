const axios = require('axios');
const CircuitBreaker = require('opossum');

class CircuitBreakerService {
  options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 3000 // After 3 seconds, try again.
  };

  axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
  });

  circuitBreaker = new CircuitBreaker(
    (method, resource, body) => {
      return this.axiosInstance[method](resource, body);
    }, 
    this.options);
  
  constructor(endpoint) {
    this.axiosInstance.defaults.baseURL = this.formatWithSlashes(endpoint);
  }

  // Helper function to add a trailing slash to an endpoint if it doesn't exist
  formatWithSlashes(endpoint) {
    return (endpoint.endsWith('/')) ? endpoint : `${endpoint}/`;
  }
}

module.exports = CircuitBreakerService;