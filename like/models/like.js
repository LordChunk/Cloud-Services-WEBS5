const Mongoose = require('mongoose');
const ObjectId = Mongoose.Schema.Types.ObjectId;
const FKHelper = require('cloud-shared/helpers/foreign-key');

// Like schema for a target
const likeSchema = new Mongoose.Schema({
    user_id: {type: ObjectId, required: true},
    // Foreign key of the target
    target_id: {
        type: ObjectId,
        ref: 'Target',
        required: true,
        validate: {
            isAsync: true,
            validator: (v) => FKHelper(Target, v),
            message: props => `${props.value} is not a valid target id`
        },
    },  
});

const Like = Mongoose.model('Like',likeSchema);
module.exports = Like;