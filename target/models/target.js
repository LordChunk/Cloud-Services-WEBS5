const Mongoose = require('mongoose');

const targetSchema = new Mongoose.Schema({
    uid:{type: String, required: true, unique: true},
    name:{type: String, required: true, maxlength: 50},
    desc:{type: String, required: true},
    img:{type: String, required: true},
})

const Target = Mongoose.model('Target',targetSchema);
module.exports =  Target;