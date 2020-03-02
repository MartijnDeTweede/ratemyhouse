const express = require('express');
const router = express.Router();
const { getVideo, updateVideo, deleteVideo, updateRatingForVideo, getHighestRatedVideos, getVideosforUser } = require('../Helpers/videoHelpers');
const { uploadHelper } = require('../Helpers/fileUploadHelper');

const { determineAndSaveFinalRating, userRatedVideo } = require('../Helpers/ratingHelper');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { verifyToken } = require('../Helpers/jwtTokenHelper');

router.post('/:videoId/rateVideo', verifyToken, async (req, res) => {
  try{
    const videoId = req.params.videoId;
    const rating = req.body.rating;

    const video = await getVideo(videoId);
    if(video) {
      const finalRating = await determineAndSaveFinalRating(videoId, req.user._id, rating);
      const hadRated = await userRatedVideo(videoId, req.user._id);
      await updateRatingForVideo(video, finalRating, hadRated);
    
      const videos = await getVideosforUser(video.owner);
    res.json(videos)
    } else {
      return handleBadRequest(res, 'Video not found');
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

router.post('/:videoId/deleteVideo', verifyToken, async (req, res) => {
  try{
    const videoId = req.params.videoId;
    await deleteVideo(videoId);

    const videos = await getVideosforUser(req.body.owner);
    res.json(videos)

  } catch(error){
    handleBadRequest(res, error);
  }
});

router.post('/uploadVideoFile',uploadHelper.single('video'), async (req, res) => {
  try{
    res.status(200).json(req.file);

  } catch(error){
    handleBadRequest(res, error);
  }
});


router.post('/uploadThumbnailFile',uploadHelper.single('thumbnail'), async (req, res) => {
  try{
    res.status(200).json(req.file);

  } catch(error){
    handleBadRequest(res, error);
  }
});


router.get('/getFeaturedVideos', async (req, res) => {
  try {
    const highestRatedVideos = await getHighestRatedVideos(12, 1);
    res.json(highestRatedVideos);
  } catch(error) {
    handleBadRequest(res, error);
  }
})
module.exports = router;