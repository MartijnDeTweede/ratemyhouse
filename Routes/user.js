const express = require('express');
const router = express.Router();

const { getUser, createUser } = require('../Helpers/userHelper') ;
const { addVideo, getVideosforUser } = require('../Helpers/videoHelpers');

router.get('/:userId', async (req, res) => {
    try{
        const user = await getUser(req.params.userId);
        res.json(user);
    }
    catch(error) {
        res.status(400).send({message:error});
    }
});

router.post('/', async (req, res) => {
    try{
      const savedUser = await createUser(req.body);
      res.json(savedUser);
    } catch(error) {
      res.status(400).send({message:error});
    };
});

router.get('/:userId/getVideos', async (req, res) => {
  try{
    const videos = await getVideosforUser(req.params.userId);
    res.json(videos);
  } catch(error){
    res.status(400).send({message:error});
  }
});

router.post('/:userId/addVideo', async (req, res) => {
  try{
    await addVideo(req.body);
    const videos = await getVideosforUser(req.params.userId);
    res.json(videos);
  } catch(error){
    res.status(400).send({message:error});
  }
});

module.exports = router;