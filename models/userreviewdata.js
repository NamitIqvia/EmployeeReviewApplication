const mongoose = require('mongoose');

const userReviewData = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    toreview:[String],
    reviewedby:[{name: String, review: String}]
})

module.exports = mongoose.model("EmployeeReview", userReviewData)