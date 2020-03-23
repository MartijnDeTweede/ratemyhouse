const express = require('express');
const router = express.Router();
const { 
  getVideo,
  updateVideo,
  deleteVideo,
  updateRatingForVideo,
  getHighestRatedVideos,
  getVideosforUser
} = require('../Helpers/videoHelpers');
const { uploadHelperImage, uploadHelperVideo } = require('../Helpers/fileUploadHelper');

const { 
  getRating,
  userRatedVideo,
  updateRating,
  createRating
} = require('../Helpers/ratingHelper');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { verifyToken } = require('../Helpers/jwtTokenHelper');
const {validateVideo } = require('../Validators/videoValidator');

router.post('/:videoId/rateVideo', verifyToken, async (req, res) => {
  try{
    const videoId = req.params.videoId;
    const rating = req.body.rating;;

    const video = await getVideo(videoId);
    if(video) {
      const userhasRated =  await userRatedVideo(videoId, req.user._id);
      if(userhasRated) {
        const currentrating = await getRating(videoId, req.user._id);
        const ratingdiff = rating - currentrating.rating;
        const newRating = parseInt(video.ratingPoints) + ratingdiff;
        await updateRatingForVideo(videoId, newRating, video.nrOfRates);
        await updateRating(currentrating._id, rating);
      } else {
        await createRating(videoId, req.user._id, rating);
        const newRating = video.ratingPoints + rating;
        const newNrOfRates = parseInt(video.nrOfRates) + 1;
        await updateRatingForVideo(videoId, newRating, newNrOfRates);
      }
    res.json({})
    } else {
      return handleBadRequest(res, 'Video not found');
    }

  } catch(error){
    handleBadRequest(res, error);
  }
});

router.post('/:videoId/updateVideo', verifyToken, async (req, res) => {
  const error = await validateVideo(req.body);
  if(error) return res.status(400).send(error);

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

router.post('/uploadVideoFile',uploadHelperVideo.single('video'), async (req, res) => {
  try{
    res.status(200).json(req.file);

  } catch(error){
    handleBadRequest(res, error);
  }
});


router.post('/uploadThumbnailFile',uploadHelperImage.single('thumbnail'), async (req, res) => {
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