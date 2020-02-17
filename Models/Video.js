const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  room: {type: String, required: true},
  title: {type: String, required: true},
  src: {type: String, required: true},
  userId: {type: String, required: true},
});

module.exports = mongoose.model('Video', videoSchema);