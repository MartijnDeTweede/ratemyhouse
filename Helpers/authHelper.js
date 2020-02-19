const  Auth = require('../Models/Auth') ;
const brcrypt = require('bcryptjs');

const addAuth = async (email, password) => {
  const auth = new Auth({
    email: email,
    password: password,
  });
  await auth.save();
}

const getAuthByEmail = async (email) => {
  const exists = await Auth.findOne({ email: email});
  return exists;
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

const credentialsAreValid = async (passwordToCheck, hashedPassword) => {
  const isValidPass = await brcrypt.compare(passwordToCheck, hashedPassword);
  return isValidPass;
}

module.exports.addAuth = addAuth;
module.exports.emailExists = emailExists;
module.exports.generateHashedPassword = generateHashedPassword;
module.exports.getAuthByEmail = getAuthByEmail;
module.exports.credentialsAreValid = credentialsAreValid;