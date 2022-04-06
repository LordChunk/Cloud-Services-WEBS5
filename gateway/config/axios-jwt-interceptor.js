var jwt = require('jsonwebtoken');

// Axios JWT Interceptor
const interceptor = {
    request: function (config) {
        // Add signed API_KEY to request headers using JWT
        const apiKey = process.env.API_KEY;
        // Sign key and add to headers
        const token = jwt.sign({ apiKey }, process.env.JWT_SECRET);
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    response: function (response) {
        // Sign opaque header and add to response headers
        const opaqueHeader = jwt.sign({}, process.env.JWT_SECRET);
        config.headers.Authorization = `Bearer ${opaqueHeader}`;
        return response;
    }
}

module.exports = interceptor;