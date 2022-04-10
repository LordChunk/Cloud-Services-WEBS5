const Like = require('../models/like');
const mongoose = require('mongoose');
const Target = require('../models/target');

const like = new Like({
  user_id: "62531a587e9bf207f5fcdf8b",
  target_id: "62531a587e9bf207f5fcdf8c"
});

const target = new Target({
  id: "62531a587e9bf207f5fcdf8c",
});

describe('Like model validation', () => {
  it('Cannot create likes for non-existing Targets', async () => {

    const error = await like.validateSync();
    expect(error.errors['target_id']).toBeDefined();
  });
});