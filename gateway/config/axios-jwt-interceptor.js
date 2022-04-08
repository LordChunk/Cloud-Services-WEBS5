var jwt = require('jsonwebtoken');

const apiKey = process.env.API_KEY;

// Axios JWT Interceptor
const interceptor = function (config) {
    // Fetch user id from request if present and add to JWT payload

    // Sign key and add to headers
    const token = jwt.sign({ apiKey }, process.env.JWT_SECRET);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
};

module.exports = interceptor;