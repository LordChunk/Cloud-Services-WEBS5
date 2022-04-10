const express = require('express');
const router = new express.Router();

const circuitBreaker = require('../services/circuit-breaker')
    .createNewCircuitBreaker(process.env.TARGET_ENDPOINT);

const requestHandler = require('../services/request-handler')
    .createNewRequestHandler(circuitBreaker);

// Register routes below
router.post('/', requestHandler.send('post'));
router.get('/', requestHandler.send('post'));

module.exports = router    