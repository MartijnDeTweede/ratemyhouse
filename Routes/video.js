const express = require('express');
const router = express.Router();
const { getVideo, updateRatingForVideo } = require('../Helpers/videoHelpers');
const { userRatedVideo, createRating } = require('../Helpers/ratingHelper');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { verifyToken } = require('../Helpers/jwtTokenHelper');
// Protect

router.post('/:videoId/rateVideo', verifyToken, async (req, res) => {
  try{
    const videoId = req.params.videoId;
    if(await userRatedVideo(videoId, req.user._id)) {
      return handleBadRequest(res, "You already ranked this house");
    } else {
      const video = await getVideo(videoId);
      if(video) {
        await updateRatingForVideo(video, req.body.rating);
        
        // Save rating so one cannot vote twice
        await createRating(videoId, req.user._id);
        res.status(200).send({message:"update succesfull"});
      } else {
        return handleBadRequest(res, 'Video not found');
      }
    }
  } catch(error){
    res.status(400).send({message:error});
  }
});

module.exports = router;