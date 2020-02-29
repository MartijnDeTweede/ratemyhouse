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

updateRating = async (ratingId, updatedRating) => {console.log('pre rating update');
  await Rating.findOneAndUpdate({_id: ratingId}, {$set: {rating: updatedRating}})
  console.log('post rating update');
};

const determineAndSaveFinalRating = async (videoId, voterId, newRating) => {
  const userHasRated = await userRatedVideo(videoId, voterId);
  console.log('userHasRated: ', userHasRated);

  if(userHasRated) {
    const oldRating = await getRating(videoId);
    console.log('oldRating: ', oldRating.rating);
    const updatedRating =  newRating- oldRating.rating;
    console.log('updatedRating: ', updatedRating);
    await updateRating(oldRating._id, newRating);
    return updatedRating;
  } else {
    await createRating(videoId, voterId, newRating);
    return newRating;
  }
}

module.exports.userRatedVideo = userRatedVideo;
module.exports.createRating = createRating;
module.exports.getRating = getRating;
module.exports.determineAndSaveFinalRating = determineAndSaveFinalRating;