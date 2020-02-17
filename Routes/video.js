const express = require('express');
const Rating = require('../Models/Rating');
const Video = require('../Models/Video');
const router = express.Router();

getVideo = async (videoId) => {
  const video = await Video.findById(videoId);
  return video;
}

userRatedVideo = async (userId, videoId) => {
  const exists = await Rating.exists({userId: userId, videoId: videoId });
  return exists;
}

router.post('/:videoId/rateVideo', async (req, res) => {
  try{
    const videoId = req.params.videoId;
    if(await userRatedVideo(videoId)) {
      res.status(400).send({message: "You already ranked this house"});
    } else {

      const video = await getVideo(videoId);
      if(video) {
        const newRating = parseInt(video.ratingPoints) + parseInt(req.body.rating, 10);
        const newNrOfRates = video.nrOfRates + 1;
        await Video.updateOne({_id: videoId}, {ratingPoints: newRating, nrOfRates: newNrOfRates});
        
        // Save rating so one cannot vote twice
        const ranking = new Rating({
          videoId: videoId,
          userId: req.body.userId,
        });
        await ranking.save();
        res.json(updatedVideo);
      } else {
        res.status(400).send({message: 'Video not found'});
      }
    }
  } catch(error){
    res.status(400).send({message:error});
  }
});

module.exports = router;