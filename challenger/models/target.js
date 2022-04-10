const Mongoose = require('mongoose');

const targetSchema = new Mongoose.Schema({
    name:{type: String, required: true, maxlength: 50},
    desc:{type: String, required: true},
    lat:{type: Number, required: true, min: -90, max: 90},
    long:{type: Number, required: true, min: -180, max: 180},
    radius:{type: Number, required: true},
    img:{type: String, required: true},
})

const Target = Mongoose.model('Target',targetSchema);
module.exports =  Target;