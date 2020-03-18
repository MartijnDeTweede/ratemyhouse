const Joi = require('@hapi/joi');

const validateVideo = async (body) => {
  const videoSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    room: Joi.string().required().min(5).max(100),
    title: Joi.string().required().min(5).max(100),
    videoSrc: Joi.string().required().min(5),
    owner: Joi.string().required().min(5).max(100),
    ratingPoints: Joi.number(),
    nrOfRates: Joi.number(),
    videoKey: Joi.string().required().min(5),
    thumbNailSrc: Joi.string().required().min(5),
    thumbNailKey: Joi.string().required().min(5),
  });

  const { error } = await videoSchema.validate(body);
  return error;
}

module.exports.validateVideo = validateVideo;