

const handleBadRequest = (res, message) => {
  return res.status(400).send({message: message})
}

const handleAccessDenied = (res, message) => {
  return res.status(401).send({message: message})
}

module.exports.handleBadRequest = handleBadRequest;
module.exports.handleAccessDenied = handleAccessDenied;
