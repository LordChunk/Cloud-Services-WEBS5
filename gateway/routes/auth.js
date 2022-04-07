require('dotenv').config();
const express = require('express');
const router = new express.Router();
const passport = require('passport');

const circuitBreaker = require('../services/circuit-breaker-service')
    .createNewCircuitBreaker(process.env.AUTH_ENDPOINT);


router.post('/login', (req, res) => {
    circuitBreaker.fire("post", 'login', req.body)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log("Login error:", error);
            res.status(500).json(error);
        })
});

router.post('/register', (req, res) => {
    circuitBreaker.fire("post", 'register', req.body)
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log("Register error:", error);
            res.status(500).json(error);
        })
    
});

module.exports = router    