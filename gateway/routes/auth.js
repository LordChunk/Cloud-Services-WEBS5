require('dotenv').config();
const express = require('express');
const router = new express.Router();
const passport = require('passport');

const circuitBreaker = require('../services/circuit-breaker')
    .createNewCircuitBreaker(process.env.AUTH_ENDPOINT);

const requestHandler = require('../services/request-handler')
    .createNewRequestHandler(circuitBreaker);


router.post('/login', requestHandler.send('post', 'login'));

router.post('/register', requestHandler.send('post', 'register'));

module.exports = router    