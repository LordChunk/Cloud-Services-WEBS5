const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const shared = require('cloud-shared');

const passport = require('passport');
const authService = require('./auth-service');
const passportStrategy = require('../shared/config/jwt-strategy');

// Generic Express setup
app.use(cors());
app.use(express.json());

// Passport setup
passport.use(passportStrategy);
app.use(passport.initialize());

// JWT header injection setup
const { default: axios } = require('axios');
axios.interceptors.request.use(shared.Interceptors.request);
axios.interceptors.response.use(shared.Interceptors.opaqueResponse);

// Register imported routes
app.use('/auth',require('./routes/auth'))


app.listen(port, () => {
    console.log('Gateway is up on http://localhost:' + port)
})

module.exports = app;