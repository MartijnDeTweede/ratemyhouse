const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    videoId: {type: String, required: true},
    userId: {type: String, required: true},
    rating: {type: Number, required: true},
})

module.exports = mongoose.model('Rating', ratingSchema);