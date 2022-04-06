// Startup db connection
require('cloud-shared').Database();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
const shared = require('cloud-shared');
const passport = require('passport');

// Generic Express setup
app.use(cors());
app.use(express.json());

// Passport setup
passport.use(shared.JwtStrategy);
app.use(passport.initialize());

// JWT header injection setup
const { default: axios } = require('axios');
axios.interceptors.request.use(shared.Interceptors.request);
axios.interceptors.response.use(shared.Interceptors.internalResponse);

// Setup registration
app.post('/register', passport.authenticate('jwt', {session: false}), (req, res) => {

});


app.listen(port);
module.exports = app;