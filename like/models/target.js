const Mongoose = require('mongoose');

const targetSchema = new Mongoose.Schema();

const Target = Mongoose.model('Target',targetSchema);
module.exports =  Target;