const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const passport = require('passport');
const authService = require('./auth-service');
const passportStrategy = require('./config/jwt-strategy');

// Generic Express setup
app.use(cors());
app.use(express.json());

// Passport setup
passport.use(passportStrategy);
app.use(passport.initialize());

// JWT header injection setup
const { default: axios } = require('axios');
axios.interceptors.request.use(require('./config/axios-jwt-interceptor').request);
axios.interceptors.response.use(require('./config/axios-jwt-interceptor').response);

// Register imported routes
app.use('/auth',require('./routes/auth'))


app.listen(port, () => {
    console.log('Gateway is up on http://localhost:' + port)
})

module.exports = app;