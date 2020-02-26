const Video = require('../Models/Video');

const getVideo = async (videoId) => {
  const video = await Video.findById(videoId);
  return video;
}

getVideosforUser = async (userName) => {
  const videos = await Video.find({owner: userName});
  console.log('videos: ', videos);
  return videos;
}

const addVideo = async (body, userName) => {
  const video = new Video({
    room: body.room,
    title: body.title,
    src: body.src,
    owner: userName,
  });
  await video.save();
}

const updateRatingForVideo = async (video, rating) => {
  const newRating = parseInt(video.ratingPoints) + parseInt(rating, 10);
  const newNrOfRates = video.nrOfRates + 1;
  await Video.updateOne({_id: video._id}, {ratingPoints: newRating, nrOfRates: newNrOfRates});
}

const getHighestRatedVideos = async (nrOfVideos, minimalNrRatings) => {
  const videos = await Video.find({"nrOfRates": { $gte: minimalNrRatings} })
  .sort({ ratingPoints : -1})
  .limit(nrOfVideos)
  .exec();
  return videos;
}

module.exports.getVideo = getVideo;
module.exports.getVideosforUser = getVideosforUser;
module.exports.addVideo = addVideo
module.exports.updateRatingForVideo = updateRatingForVideo;
module.exports.getHighestRatedVideos = getHighestRatedVideos;