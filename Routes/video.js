const express = require('express');
const Rating = require('../Models/Rating');

const router = express.Router();

userRatedVideo = async (userId, videoId) => {
  const exists = await Rating.exists({userId: userId, videoId: videoId });
  return exists;
}

getRatingForVideo = async (videoId) => {
  const ratings = await Rating.find({videoId: videoId});
  return ratings;
}

getRatingObjectForVideo = async(videoId) => {
  const ratings = await getRatingForVideo(videoId);
  const ratingPoints = ratings.reduce((total, rating) => {
    return total + rating.rating;
  }, 0)

  return ({
    ratingPoints: ratingPoints,
    nrOfRates: ratings.length,
  });
}

router.post('/:videoId/rateVideo', async (req, res) => {
  try{
    if(await userRatedVideo(req.body.userId, req.params.videoId)) {
      res.status(400).send({message: "You already ranked this house"});
    } else {
      const ranking = new Rating({
        videoId: req.params.videoId,
        userId: req.body.userId,
        rating: req.body.rating,
      });
      await ranking.save();

      // get rating vor video
      // check if hs
      // update hs
      res.status(200).send();
    }
  } catch(error){
    res.status(400).send({message:error});
  }
});

router.get('/:videoId/getRating', async (req, res) => {
  try{
    const ratingObject = await getRatingObjectForVideo(req.params.videoId);
    res.json(ratingObject);
  } catch(error) {
    res.status(400).send({message:error});
  }
})

module.exports = router;