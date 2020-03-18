const Rating = require('../Models/Rating');

const userRatedVideo = async (videoId, userId) => (await Rating.exists({userId: userId, videoId: videoId })); 

const createRating = async (videoId, userId, ratingValue) => {
  const rating = new Rating({
    videoId: videoId,
    userId: userId,
    rating: ratingValue,
  });
  await rating.save();
} 

const updateRating = async(id, rating) => (await Rating.updateOne({_id: id}, {rating: rating} ))

const getRating = async(videoId, userId) => (await Rating.findOne({videoId: videoId, userId: userId }))

const hasRated = async(videoId, userId) => (await Rating.exists({videoId: videoId, userId: userId }))

module.exports.userRatedVideo = userRatedVideo;
module.exports.createRating = createRating;
module.exports.getRating = getRating;
module.exports.hasRated = hasRated;
module.exports.updateRating = updateRating;