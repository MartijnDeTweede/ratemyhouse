const Joi = require('@hapi/joi');


const validateSignUp = async (body) => {
  const signupSchema = Joi.object({
    email: Joi.string().required().min(10).max(100).email(),
    userName: Joi.string().required().min(4).max(30),
    password: Joi.string().required().min(8).max(30),
  });

  const { error } = await signupSchema.validate(body);
  return error;
}

module.exports.validateSignUp = validateSignUp;