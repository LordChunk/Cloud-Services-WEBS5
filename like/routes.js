// Startup db connection
const mongoose = require('mongoose');
const shared = require('cloud-shared');
shared.Database(mongoose);

// Import express
const express = require('express');
const router = new express.Router();
const createError = require('http-errors');

// Import route specific dependencies
const Like = require('./models/like');
const Target = require('./models/target');

// Routes
router.post('/:target_id', async (req, res, next) => {
  // Check if user has already liked the target and delete it if so otherwise create a new like
  const user_id = req.user.uid;
  const target_id = req.params.target_id;
  
  // Check if target exists
  const target = targetFinder(target_id);
  if (!target) {
    return next(createError(400, 'Cannot like a non-existing target'));
  }

  Like.findOne({ user_id, target_id })
    .then(like => {
      if (like) {
        like.remove()
          .then(() => res.status(201).json({ message: 'Like removed' }))
          .catch(err => next(err));
      } else {
        new Like({ user_id, target_id }).save()
          .then(() => res.status(201).json({ message: 'Like added' }))
          .catch(err => next(err));
      }
    })
});

// Get the number of likes for a target
router.get('/:target_id/count', async (req, res, next) => {
  const target_id = req.params.target_id;

  // Check if target exists
  const target = targetFinder(target_id);
  if (!target) {
    return next(createError(400, 'Cannot get likes for a non-existing target'));
  }

  Like.count({ target_id })
    .then(count => res.status(200).json({ count }))
    .catch(err => next(err));
});


const targetFinder = async (target_id) => {
  return await Target.findById(target_id).exec();
}
  

module.exports = router;