const express = require('express');
const router = new express.Router();

const circuitBreaker = require('../services/circuit-breaker')
    .createNewCircuitBreaker(process.env.LIKE_ENDPOINT);

const requestHandler = require('../services/request-handler')
    .createNewRequestHandler(circuitBreaker);


// Register routes
router.post('/:target_id', requestHandler.send('post'));

module.exports = router