const express = require('express');
const Rating = require('../Models/Rating');

const router = express.Router();

userRatedVideo = async (userId, videoId) => {
  const exists = await Rating.exists({userId: userId, videoId: videoId });
  return exists;
}

router.post('/:videoId/rateVideo', async (req, res) => {
  try{
    // See if in Db;
    if(await userRatedVideo(req.body.userId, req.params.videoId)) {
      res.status(400).send({message: "You already ranked this house"});
    } else {
      const ranking = new Rating({
        videoId: req.params.videoId,
        userId: req.body.userId,
        rating: req.body.rating,
      });
      await ranking.save().send();
      res.status(200);
    }
  } catch(error){
    res.status(400).send({message:error});
  }
});

module.exports = router;