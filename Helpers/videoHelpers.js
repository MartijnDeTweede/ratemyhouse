const Video = require('../Models/Video');

const getVideo = async (videoId) => {
  const video = await Video.findById(videoId);
  return video;
}

getVideosforUser = async (userName) => {
  const videos = await Video.find({owner: userName});
  return videos;
}

const addVideo = async (body, userName) => {
  const video = new Video({
    room: body.room,
    title: body.title,
    videoSrc: body.videoSrc,
    owner: userName,
    videoKey: body.videoKey,
    thumbNailSrc: body.thumbNailSrc,
    thumbNailKey: body.thumbNailKey,
  });
  await video.save();
}

const updateVideo = async(body, videoId) => {
  await Video.findOneAndUpdate({_id: videoId}, {$set: {...body}});
}

const deleteVideo = async(videoId) => {
  await Video.findOneAndDelete({_id: videoId});
}

const updateRatingForVideo = async (video, rating, hasRated) => {
  const newRating = parseInt(video.ratingPoints) + parseInt(rating, 10);
  const newNrOfRates = hasRated ? video.nrOfRates: video.nrOfRates + 1;
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
module.exports.addVideo = addVideo;
module.exports.updateVideo = updateVideo;
module.exports.deleteVideo = deleteVideo;

module.exports.updateRatingForVideo = updateRatingForVideo;
module.exports.getHighestRatedVideos = getHighestRatedVideos;