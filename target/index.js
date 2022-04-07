const express = require('express');
const app = express();
const port = process.env.PORT || 3015;
const cors = require('cors');
const passport = require('passport');
const shared = require('cloud-shared');

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

// Register routes
app.use('/', require('./routes'));


app.listen(port,  () => {
  console.log('Started service at: ' + new Date().toLocaleString())
  console.log('Gateway is up on http://localhost:' + port)
});

module.exports = app;