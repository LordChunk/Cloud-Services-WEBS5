const Mongoose = require('mongoose');

const targetSchema = new Mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

const Target = Mongoose.model('Target',targetSchema);
module.exports =  Target;