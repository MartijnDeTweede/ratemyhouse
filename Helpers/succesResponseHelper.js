const { createToken } = require('./jwtTokenHelper');

const sendValidRequestWithUser = (res, user) => {
  const token = createToken(user._id);
  res.header('auth-token', token);
  res.json(user);
}

module.exports.sendValidRequestWithUser = sendValidRequestWithUser;