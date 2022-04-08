const express = require('express');
const router = new express.Router();
const passport = require('passport');
const GatewayStrategy = require('../config/jwt-strategy');

const circuitBreaker = require('../services/circuit-breaker')
    .createNewCircuitBreaker(process.env.AUTH_ENDPOINT);

const requestHandler = require('../services/request-handler')
    .createNewRequestHandler(circuitBreaker);

    
passport.use(GatewayStrategy);
router.use(passport.initialize());


router.post('/login', requestHandler.send('post', 'login'));
router.post('/register', requestHandler.send('post', 'register'));
router.post('/test', passport.authenticate('jwt', { session: false }), requestHandler.send('post', 'test'));
router.post('/test-2', requestHandler.send('post', 'test'));

module.exports = router    