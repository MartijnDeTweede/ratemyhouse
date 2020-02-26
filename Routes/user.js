const express = require('express');
const router = express.Router();

const { getUser, updateUser, getUserById } = require('../Helpers/userHelper') ;
const { addVideo, getVideosforUser } = require('../Helpers/videoHelpers');
const { handleBadRequest } = require('../Helpers/responseHelpers');
const { verifyToken } = require('../Helpers/jwtTokenHelper');

router.get('/:userName', async (req, res) => {
    try{
        const user = await getUser(req.params.userName);
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

router.get('/:userName/isOwnPage',verifyToken, async (req, res) => {
  const user = await getUserById(req.user._id);
  try{
      const isOwnPage = user.userName === req.params.userName; 
      res.json({isOwnPage: isOwnPage});
  }
  catch(error) {
    handleBadRequest(res, error);
  }
});

router.get('/:userName/getVideos', async (req, res) => {
  try{
    const videos = await getVideosforUser(req.params.userName);
    res.json(videos);
  } catch(error){
    handleBadRequest(res, error);
  }
});

router.post('/:userName/addVideo',verifyToken, async (req, res) => {
  try{
    await addVideo(req.body, req.params.userName);
    const videos = await getVideosforUser(req.params.userName);
    res.json(videos);
  } catch(error){
    handleBadRequest(res, error);
  }
});

module.exports = router;