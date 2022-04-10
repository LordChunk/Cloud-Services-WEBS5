const Mongoose = require('mongoose');
const ObjectId = Mongoose.Schema.Types.ObjectId;


const challengerSchema = new Mongoose.Schema({
    creatorid:{type: ObjectId, required: true},
    targetid:{type: ObjectId, required: true},
    img:{type: String, required: true},
})

const challenger = Mongoose.model('Challenger', challengerSchema);
module.exports =  challenger;