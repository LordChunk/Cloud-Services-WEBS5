const Mongoose = require('mongoose');

const challengerSchema = new Mongoose.Schema({
    creatorid:{type: Number, required: true},
    targetid:{type: Number, required: true},
    img:{type: String, required: true},
})

const challenger = Mongoose.model('Challenger', challengerSchema);
module.exports =  challenger;