const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  room: {type: String, required: true},
  title: {type: String, required: true},
  videoSrc: {type: String, required: true},
  owner: {type: String, required: true},
  ratingPoints: {type: Number, default: 0},
  nrOfRates:{type: Number, default: 0},
  videoKey: {type: String, required: true},
  thumbNailSrc: {type: String, required: true},
  thumbNailKey: {type: String, required: true},
});

module.exports = mongoose.model('Video', videoSchema);