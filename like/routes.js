// Startup db connection
const mongoose = require('mongoose');
const shared = require('cloud-shared');
shared.Database(mongoose);

// Import express
const express = require('express');
const router = new express.Router();

// Import route specific dependencies
const Like = require('./models/like');

// Routes
router.post('/:target_id', (req, res, next) => {
  // Check if user has already liked the target and delete it if so otherwise create a new like
  const user_id = req.user.uid;
  const target_id = req.params.target_id;

  Like.findOne({ user_id, target_id })
    .then(like => {
      if (like) {
        like.remove()
          .then(() => res.status(200).json({ message: 'Like removed' }))
          .catch(err => next(err));
      } else {
        new Like({ user_id, target_id }).save()
          .then(() => res.status(200).json({ message: 'Like added' }))
          .catch(err => next(err));
      }
    })
});

module.exports = router;