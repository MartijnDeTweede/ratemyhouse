const Guid = require('guid');

const User = require('../Models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
}
const getUserByEmail = async (email) => {
  const user = await User.findOne({ "contactInfo.email": email });
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

const updateUser = async(body, userId) => {
  const updatedUser = await User.findOneAndUpdate({_id: userId}, {$set: {...body}});
  return updatedUser;
}

module.exports.getUser = getUser;
module.exports.createInitialUser = createInitialUser;
module.exports.updateUser = updateUser;
module.exports.getUserByEmail = getUserByEmail;