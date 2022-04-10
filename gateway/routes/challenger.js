const express = require('express');
const router = new express.Router();

const circuitBreaker = require('../services/circuit-breaker')
    .createNewCircuitBreaker(process.env.CHALLENGER_ENDPOINT);

const requestHandler = require('../services/request-handler')
    .createNewRequestHandler(circuitBreaker);

// Register routes below
router.post('/', requestHandler.send('post'));

module.exports = router    