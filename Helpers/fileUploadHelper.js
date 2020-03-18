const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv/config');
const { validateImage, validateVideo } = require('../Validators/filevalidators');

aws.config.update({
  region: 'eu-central-1',
  accessKeyId: process.env.S3ACCESSKEY,
  secretAccessKey: process.env.S3SECRETACCESSKEY,
})
const s3 = new aws.S3();

 
const uploadHelperImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ratemyhouse',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.originalname});
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`)
    }
  }),
  fileFilter: validateImage,
})

const uploadHelperVideo = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ratemyhouse',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.originalname});
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${file.originalname}`)
    }
  }),
  fileFilter: validateVideo,
})

module.exports.uploadHelperImage = uploadHelperImage;
module.exports.uploadHelperVideo = uploadHelperVideo;