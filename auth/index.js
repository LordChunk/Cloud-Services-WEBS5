// Startup db connection
const mongoose = require('mongoose');
const shared = require('cloud-shared');
shared.Database(mongoose);

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const passport = require('passport');

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
  res.status(201).json(ret);
});

app.get('/users', (req, res) => {
  console.log('Getting users...');
  User.find()
    .then(users => {
      console.log("Found users");
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("Error getting users");
      res.status(500).json({
        error: err
      });
    }
  );
});

app.post('/login', (req, res) => {
});


app.listen(port,  () => {
  console.log('Started service at: ' + new Date().toLocaleString())
  console.log('Gateway is up on http://localhost:' + port)
});

module.exports = app;