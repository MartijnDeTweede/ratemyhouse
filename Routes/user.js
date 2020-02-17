const express = require('express');
const User = require('../Models/User');
const Guid = require('guid');

const router = express.Router();

getUser = async (userId) => {
  const user = await User.findOne({userid: userId});
  return user;
}

//Todo, see if I can combine this with post in some way
createInitialUser = async(emailaddress) => {
  const guid = Guid.create();

  const user =  new User({
    userid: guid,
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
  // Log the error
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
        userid: guid,
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
    }
    catch(error) {
      res.status(400).send({message:error});
    };
});

module.exports = router;
module.exports.getUser = this.getUser;
module.exports.createInitialUser = this.createInitialUser;