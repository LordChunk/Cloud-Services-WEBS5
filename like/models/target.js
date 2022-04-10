const Mongoose = require('mongoose');

const targetSchema = new Mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
});

const Target = Mongoose.model('Target',targetSchema);
module.exports =  Target;