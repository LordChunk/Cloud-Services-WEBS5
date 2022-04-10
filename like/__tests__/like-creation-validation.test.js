process.env.JWT_SECRET = 'secret'
process.env.API_KEY = 'secret_api_key'

const app = require('../index')
const mongoose = require('mongoose')
const request = require('supertest')
const Like = require('../models/like');
const Target = require('../models/target');

const like = new Like({
  user_id: "62531a587e9bf207f5fcdf8b",
  target_id: "62531a587e9bf207f5fcdf8c"
});

const target = new Target({
  id: "62531a587e9bf207f5fcdf8c"
})


describe('Like model validation', () => {
  beforeEach(async () => {
    await Target.deleteMany({});
    await Like.deleteMany({});
  })

  it('Cannot create likes for non-existing Targets', async () => {

    // Expect an error to be thrown when trying to save a like with a non-existing target
    await expect(like.save()).rejects.toThrow();
  });

  it('Can create likes for existing Targets', async () => {
    // Create a target
    await target.save();

    // Expect no error to be thrown when trying to save a like with an existing target
    await expect(like.save()).resolves.not.toThrow();
  });
});