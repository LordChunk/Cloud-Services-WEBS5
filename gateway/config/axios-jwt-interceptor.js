var jwt = require('jsonwebtoken');

const apiKey = process.env.API_KEY;

// Axios JWT Interceptor
const interceptor = function (config) {
    // Get X-Interceptor-Uid header and unset it
    const uid = config.headers['X-Interceptor-Uid'];
    delete config.headers['X-Interceptor-Uid'];

    // Sign key and add to headers
    const token = jwt.sign({ apiKey, uid }, process.env.JWT_SECRET);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
};

module.exports = interceptor;