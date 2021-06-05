const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true },
    email:{type: String, required: true, unique: true },
    password:{type: String, required: true },
    toreview:[String],
    reviewedby:[{name: String, review: String}]
})

module.exports = mongoose.model('User', userSchema);