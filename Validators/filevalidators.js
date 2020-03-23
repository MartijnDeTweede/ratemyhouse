const validateImage = (req, file, cb) =>{
  if(file.mimetype === 'image/jpeg' || 'image/png') {
    cb(null, true);
  } else {
    throw("image must be jpeg or png");
  }
};

const validateVideo = (req, file, cb) =>{
  if(file.mimetype.includes("video") || file.mimetype === 'application/octet-stream') {
    cb(null, true);
  } else {
    throw("video is not of the correct type");
  }
};

module.exports.validateImage = validateImage;
module.exports.validateVideo = validateVideo;