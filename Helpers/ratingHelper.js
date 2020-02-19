const Rating = require('../Models/Rating');

const userRatedVideo = async (userId, videoId) => {
  const exists = await Rating.exists({userId: userId, videoId: videoId });
  return exists;
}

const createRating = async (videoId, userId) => {
  const ranking = new Rating({
    videoId: videoId,
    userId: userId,
  });
  await ranking.save();
} 

module.exports.userRatedVideo = userRatedVideo;
module.exports.createRating = createRating;