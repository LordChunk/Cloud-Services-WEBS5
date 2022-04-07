require('dotenv').config();
const express = require('express');
const router = new express.Router();
const axios = require('axios');
const CircuitBreaker = require('opossum');
const passport = require('passport');

const endpoint = process.env.AUTH_ENDPOINT;

const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 3000 // After 3 seconds, try again.
};

const circuitBreaker = new CircuitBreaker(callService, options);


router.post('/login', (req, res) => {
    circuitBreaker.fire("post", endpoint, 'login', req.body)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.post('/register', passport.authenticate('jwt'), (req, res) => {
    circuitBreaker.fire("post", endpoint, 'register', req.body)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    
});

// Function for handling network requests
function callService(method, serviceAddress, resource, body) {
    return axios({
        method: method,
        url: formatWithSlashes(serviceAddress) + resource,
        data: body,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

//Helper functie om het gedoe met slashes te voorkomen
function formatWithSlashes(serviceAddress) {
    return (serviceAddress.endsWith('/')) ? serviceAddress : '/';
}

module.exports = router    