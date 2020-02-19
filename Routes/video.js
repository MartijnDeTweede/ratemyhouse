const express = require('express');
const router = express.Router();
const { getVideo, updateRatingForVideo } = require('../Helpers/videoHelpers');
const { userRatedVideo, createRating } = require('../Helpers/ratingHelper');

router.post('/:videoId/rateVideo', async (req, res) => {
  try{
    const videoId = req.params.videoId;
    if(await userRatedVideo(videoId)) {
      res.status(400).send({message: "You already ranked this house"});
    } else {
      const video = await getVideo(videoId);
      if(video) {
        await updateRatingForVideo(video, req.body.rating);
        
        // Save rating so one cannot vote twice
        await createRating(videoId, req.body.userId);
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