const Joi = require('joi');
const userService = require('../services/userService');

const schema = Joi.object({
  displayName: Joi.string().min(8).not().empty()
  .required(),
  email: Joi.string().not().empty().email()  
  .required(),
  password: Joi.string().length(6).not().empty()
  .required(),
  image: Joi.string(),
});

const userValidationError = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  return next();
};

const userAlreadyRegistered = async (req, res, next) => {
  const { email } = req.body;
  const duplicateEmail = await userService.getUserByEmail(email);
  if (duplicateEmail) return res.status(409).json({ message: 'User already registered' });
  return next();
};

module.exports = { userValidationError, 
  userAlreadyRegistered
};