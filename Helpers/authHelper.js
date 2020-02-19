const  Auth = require('../Models/Auth') ;
const brcrypt = require('bcryptjs');

const addAuth = async (email, password) => {
  const auth = new Auth({
    email: email,
    password: password,
  });
  await auth.save();
}

const emailExists = async (email) => {
  const exists = await Auth.exists({ email: email});
  return exists;
}

const generateHashedPassword = async (password) => {
  const salt = await brcrypt.genSalt(10);
  const hashedPassword = await brcrypt.hash(password, salt)
  return hashedPassword;
}

module.exports.addAuth = addAuth;
module.exports.emailExists = emailExists;
module.exports.generateHashedPassword = generateHashedPassword;