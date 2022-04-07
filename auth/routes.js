// Startup db connection
const mongoose = require('mongoose');
const shared = require('cloud-shared');
shared.Database(mongoose);

// Import express
const express = require('express');
const router = new express.Router();

// Import route specific dependencies
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Setup registration
router.post('/register', async (req, res) => {
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

router.get('/users', (req, res) => {
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

router.post('/login', (req, res) => {
  console.log('Logging in user...');
  const body = req.body;
  User.findOne({ email: body.email })
    .select('+hash +salt')
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Invalid email or password'
        });
      }
      // Check password
      const validPassword = bcrypt.compareSync(body.password, user.hash);
      if (!validPassword) {
        return res.status(401).json({
          error: 'Invalid email or password'
        });
      }
      // Create opaque token
      const token = jwt.sign({}, process.env.JWT_SECRET);

      // Remove hash and salt from user object
      user.hash = undefined;
      user.salt = undefined;
      // Send user with token
      res.status(200).json({
        user: user,
        token: token
      });
    })
    .catch(err => {
      console.log("Error logging in user", err);
      res.status(500).json({
        error: err
      });
    }
  );
});

module.exports = router;