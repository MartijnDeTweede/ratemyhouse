const { createToken } = require('./jwtTokenHelper');

const sendValidRequestWithUserCredentials = (res, user) => {
  const token = createToken(user._id);
  res.header('auth-token', token);
  const responseToSend = {
    isLoggedIn: true,
    userName: user.userName,
    token: token,
  }

  res.json(responseToSend);
}

module.exports.sendValidRequestWithUserCredentials = sendValidRequestWithUserCredentials;