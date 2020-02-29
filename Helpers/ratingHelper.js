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

const getRating = async(videoId) => (await Rating.findOne({videoId: videoId}))

updateRating = async (ratingId, updatedRating) => (  await Rating.findOneAndUpdate({_id: ratingId}, {$set: {rating: updatedRating}}))

const determineAndSaveFinalRating = async (videoId, voterId, newRating) => {
  const userRatedVideo = await userRatedVideo(videoId, voterId);

  if(userRatedVideo) {
    const oldRating = await getRating(videoId);
    const updatedRating =  oldRating.rating - newRating;
    await updateRating(oldRating._id, updatedRating);
    return updatedRating;
  } else {
    await createRating(videoId, voterId, newRating);
    return newRating;
  }
}

module.exports.userRatedVideo = userRatedVideo;
module.exports.createRating = createRating;
module.exports.getRating = getRating;
module.exports.determineFinalRating = determineAndSaveFinalRating;