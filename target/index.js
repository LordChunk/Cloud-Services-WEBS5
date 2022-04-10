const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const passport = require('passport');
const shared = require('cloud-shared');

// Generic Express setup
app.use(cors());
app.use(express.json());

// Passport setup
passport.use(shared.JwtStrategy);
app.use(passport.initialize());

// Register routes
app.use('/', require('./routes'));


app.listen(port,  () => {
  console.log('Started service at: ' + new Date().toLocaleString())
  console.log('Gateway is up on http://localhost:' + port)
});

module.exports = app;