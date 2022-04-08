var jwt = require('jsonwebtoken');

const apiKey = process.env.API_KEY;

// Axios JWT Interceptor
const interceptor = {
    request: function (config) {
        // Sign key and add to headers
        const token = jwt.sign({ apiKey }, process.env.JWT_SECRET);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    internalResponse: function (response) {            
        // Sign header with internal key and add to response headers
        const token = jwt.sign({ apiKey }, process.env.JWT_SECRET);
        response.headers.Authorization = `Bearer ${token}`;
        return response;
    },
    opaqueResponse: function (response) {
        // TODO: Check auth state of user
        // Sign opaque header and add to response headers
        const opaqueHeader = jwt.sign({}, process.env.JWT_SECRET);
        response.headers.Authorization = `Bearer ${opaqueHeader}`;
        return response;
    }
}

module.exports = interceptor;