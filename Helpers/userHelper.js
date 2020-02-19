const Guid = require('guid');

const User = require('../Models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
}
const getUserByEmail = async (email) => {
  const user = await User.findOne({
    "contactInfo.email": email,
  });
  return user;
}

//Todo, see if I can combine this with post in some way
const createInitialUser = async(emailaddress, userName) => {
  const guid = Guid.create();

  const user =  new User({
    userId: guid,
    userName: userName,
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
  const savedUser = await user.save();
  return savedUser;
}

const createUser = async(body) => {
    const user =  new User({
      userName: body.userName,
      contactInfo: {
          email: body.contactInfo.email,
          phoneNumber: body.contactInfo.phoneNumber,
      },
      location: {
          postalCode: body.location.postalCode,
          city: body.location.city,
          county: body.location.county,
          street: body.location.street,
          houseNumber: body.location.houseNumber,
          houseNumberAddition: body.location.houseNumberAddition,
      },
      objectForSale: body.objectForSale
  });
  const savedUser = await user.save();
  return savedUser;
}

module.exports.getUser = getUser;
module.exports.createInitialUser = createInitialUser;
module.exports.createUser = createUser;
module.exports.getUserByEmail = getUserByEmail;