const Video = require('../Models/Video');

const getVideo = async (videoId) => {
  const video = await Video.findById(videoId);
  return video;
}

getVideosforUser = async (userId) => {
  const videos = await Video.find({userId: userId});
  return videos;
}

const addVideo = async (body) => {
  try{
    const video = new Video({
      room: body.room,
      title: body.title,
      src: body.src,
      userId: params.userId,
    });
    await video.save();
  } catch(error) {
    return error;
  }
}

const updateRatingForVideo = async (video, rating) => {
  try {
    const newRating = parseInt(video.ratingPoints) + parseInt(rating, 10);
    const newNrOfRates = video.nrOfRates + 1;
    await Video.updateOne({_id: video._id}, {ratingPoints: newRating, nrOfRates: newNrOfRates});
  } catch(error) {
    return error;
  }
}

module.exports.getVideo = getVideo;
module.exports.getVideosforUser = getVideosforUser;
module.exports.addVideo = addVideo
module.exports.updateRatingForVideo = updateRatingForVideo;