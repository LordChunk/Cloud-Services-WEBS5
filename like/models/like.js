const Mongoose = require('mongoose');

// Like schema for a target
const likeSchema = new Mongoose.Schema({
    user_id:{type: String, required: true},
    target_id:{type: String, required: true},  
});

const Like = Mongoose.model('Like',likeSchema);
module.exports = Like;