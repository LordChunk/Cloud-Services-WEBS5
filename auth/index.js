// Startup db connection
require('cloud-shared').Database.connect();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const shared = require('cloud-shared');
const passport = require('passport');
;
const User = require('./models/user');
const bcrypt = require('bcryptjs');

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
app.post('/register', async (req, res) => {
  console.log('Registering user...');	
  const body = req.body;
  const salt = bcrypt.genSaltSync(10);
  const user = new User({
    // Generate UID
    uid: mongoose.Types.ObjectId(),
    email: body.email,
    // Hash password
    hash: bcrypt.hashSync(body.password, salt),
    salt: salt,
    isOwner: body.isOwner,
  });

  const ret = await user.save();
  res.json(ret);
});

app.get('/users', async (req, res) => {
  console.log('Getting users...');
  res.send(authService.getUsers());
});

app.post('/login', (req, res) => {
});


app.listen(port,  () => {
  console.log('Started service at: ' + new Date().toLocaleString())
  console.log('Gateway is up on http://localhost:' + port)
});

module.exports = app;