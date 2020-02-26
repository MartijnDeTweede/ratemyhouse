const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  room: {type: String, required: true},
  title: {type: String, required: true},
  src: {type: String, required: true},
  owner: {type: String, required: true},
  ratingPoints: {type: Number, default: 0},
  nrOfRates:{type: Number, default: 0},
});

module.exports = mongoose.model('Video', videoSchema);