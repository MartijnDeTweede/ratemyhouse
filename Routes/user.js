const express = require('express');
const User = require('../Models/User');
const Video = require('../Models/Video');
const Guid = require('guid');

const router = express.Router();

getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
}

getVideosforUser = async (userId) => {
  const videos = await Video.find({userId: userId});
  return videos;
}

//Todo, see if I can combine this with post in some way
createInitialUser = async(emailaddress, userName) => {
  const guid = Guid.create();

  const user =  new User({
    userId: guid,
    username: userName,
    contactInfo: {
        email: emailaddress,
        phoneNumber: '',
    },
    location: {
        postalCode: '',
        city: '',
        county: '',
        street: '',
        houseNumber:0,
        houseNumberAddition: '',
    },
    objectForSale: false,
  });

  try{
    const savedUser = await user.save();
    return savedUser;
  }
  catch(error) {
    return error;
  };
}

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
    const guid = Guid.create();

    const user =  new User({
        userName: req.body.userName,
        contactInfo: {
            email: req.body.contactInfo.email,
            phoneNumber: req.body.contactInfo.phoneNumber,
        },
        location: {
            postalCode: req.body.location.postalCode,
            city: req.body.location.city,
            county: req.body.location.county,
            street: req.body.location.street,
            houseNumber: req.body.location.houseNumber,
            houseNumberAddition: req.body.location.houseNumberAddition,
        },
        objectForSale: req.body.objectForSale
    });

    try{
      const savedUser = await user.save();
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
    const video = new Video({
      room: req.body.room,
      title: req.body.title,
      src: req.body.src,
      userId: req.params.userId,
    });
    await video.save();
    const videos = await getVideosforUser(req.params.userId);
    res.json(videos);
  } catch(error){
    res.status(400).send({message:error});
  }
});

module.exports = router;
module.exports.getUser = getUser;
module.exports.createInitialUser = createInitialUser;