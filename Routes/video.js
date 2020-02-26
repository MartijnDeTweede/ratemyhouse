const express = require('express');
const router = express.Router();
const { getVideo, updateVideo, updateRatingForVideo, getHighestRatedVideos, getVideosforUser } = require('../Helpers/videoHelpers');
const { userRatedVideo, createRating } = require('../Helpers/ratingHelper');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { verifyToken } = require('../Helpers/jwtTokenHelper');

router.post('/:videoId/rateVideo', verifyToken, async (req, res) => {
  try{
    const videoId = req.params.videoId;
    if(await userRatedVideo(videoId, req.user._id)) {
      return handleBadRequest(res, "You already ranked this house");
    } else {
      const video = await getVideo(videoId);
      if(video) {
        await updateRatingForVideo(video, req.body.rating);
        
        // Save rating  in ratingscollection so one cannot vote twice
        await createRating(videoId, req.user._id);
        res.status(200).send({message:"update succesfull"});
      } else {
        return handleBadRequest(res, 'Video not found');
      }
    }
  } catch(error){
    handleBadRequest(res, error);
  }
});

router.post('/:videoId/updateVideo', verifyToken, async (req, res) => {
  try{
    const videoId = req.params.videoId;
    await updateVideo(req.body, videoId);

    const videos = await getVideosforUser(req.body.owner);
    res.json(videos)

  } catch(error){
    handleBadRequest(res, error);
  }
});


router.get('/getFeaturedVideos', async (req, res) => {
  try {
    const highestRatedVideos = await getHighestRatedVideos(10, 1);
    res.json(highestRatedVideos);
  } catch(error) {
    handleBadRequest(res, error);
  }
})
module.exports = router;