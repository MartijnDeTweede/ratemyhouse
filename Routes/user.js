const express = require('express');
const router = express.Router();

const { getUser, updateUser } = require('../Helpers/userHelper') ;
const { addVideo, getVideosforUser } = require('../Helpers/videoHelpers');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { verifyToken } = require('../Helpers/jwtTokenHelper');

router.get('/:userId', async (req, res) => {
    try{
        const user = await getUser(req.params.userId);
        res.json(user);
    }
    catch(error) {
      handleBadRequest(res, error);
    }
});

router.post('/updateUserInfo',verifyToken, async (req, res) => {
    try{
      const savedUser = await updateUser(req.body, req.user._id);
      res.json(savedUser);
    } catch(error) {
      handleBadRequest(res, error);
    };
});

router.get('/:userId/getVideos', async (req, res) => {
  try{
    const videos = await getVideosforUser(req.params.userId);
    res.json(videos);
  } catch(error){
    handleBadRequest(res, error);
  }
});

// Protect
router.post('/:userId/addVideo', async (req, res) => {
  try{
    await addVideo(req.body);
    const videos = await getVideosforUser(req.params.userId);
    res.json(videos);
  } catch(error){
    handleBadRequest(res, error);
  }
});

module.exports = router;