const jwt = require('jsonwebtoken');
const {handleAccessDenied, handleBadRequest } = require('./responseHelpers');
require('dotenv/config');

const createToken = (userId) => {
  return jwt.sign({_id: userId}, process.env.TOKEN_SECRET);
};

const verifyToken = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return handleAccessDenied(res, 'Access denied');
  }

  try{
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch(error) {
    handleBadRequest(res, error);
  }
}

module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;