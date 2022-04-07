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

const axiosInstance = axios.create({
    baseURL: formatWithSlashes(endpoint),
    headers: {
        'Content-Type': 'application/json'
    }
});


router.post('/login', (req, res) => {
    circuitBreaker.fire("post", 'login', req.body)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.post('/register', (req, res) => {
    circuitBreaker.fire("post", 'register', req.body)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    
});

// Function for handling network requests
function callService(method, resource, body) {
    return axiosInstance[method](resource, body);
}

//Helper functie om het gedoe met slashes te voorkomen
function formatWithSlashes(endpoint) {
    return (endpoint.endsWith('/')) ? endpoint : '/';
}

module.exports = router    