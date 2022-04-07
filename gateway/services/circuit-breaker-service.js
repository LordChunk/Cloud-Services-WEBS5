const axios = require('axios');
const CircuitBreaker = require('opossum');

// This singleton service is used to create a CircuitBreaker instance for each microservice
class CircuitBreakerService {
  options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 3000 // After 3 seconds, try again.
  };

  // Returns a new CircuitBreaker instance which should be used for one microservice
  createNewCircuitBreaker(endpoint) {
    // Setup an Axios instance with the base URL and headers
    const axiosInstance = axios.create({
      baseURL: this.formatWithSlashes(endpoint),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return new CircuitBreaker(
      // Universal function to call the endpoint using Axios
      (method, resource, body) => {
        return axiosInstance[method](resource, body);
      },
      this.options
    );
  }

  // Helper function to add a trailing slash to an endpoint if it doesn't exist
  formatWithSlashes(endpoint) {
    return (endpoint.endsWith('/')) ? endpoint : `${endpoint}/`;
  }
}

module.exports = new CircuitBreakerService();