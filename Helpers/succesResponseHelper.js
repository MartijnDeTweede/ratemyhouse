const { createToken } = require('./jwtTokenHelper');

const sendValidRequestWithUser = (res, user) => {
  const token = createToken(user._id);
  res.header('auth-token', token);
  const responseToSend = {
    isLoggedIn: true,
    userName: user.userName,
  }

  res.json(responseToSend);
}

module.exports.sendValidRequestWithUser = sendValidRequestWithUser;