require('dotenv').config(); 
const express        = require('express');
const router         = new express.Router();
const axios          = require('axios');
const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 3000 // After 3 seconds, try again.
};

const circuitBreaker = new CircuitBreaker(axios.get, options);


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const url = `${process.env.API_URL}/login`;

    circuitBreaker.fire(url, {
        username,
        password
    })
    .then(response => {
        res.status(200).json(response.data);
    }
    )
    .catch(error => {
        res.status(500).json(error);
    }
    )
});

