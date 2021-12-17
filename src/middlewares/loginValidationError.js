const Joi = require('joi');
const userService = require('../services/userService');
const { BAD_REQUEST, INVALID_FIELDS } = require('../helpers');

const schema = Joi.object({
  email: Joi.string().email().not().empty()
  .required(),
  password: Joi.string().length(6).not().empty()
  .required(),
});

const loginValidationError = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  return next();
};

const isValidEntries = async (req, res, next) => {
  const { email, password } = req.body;

  const findUser = await userService.getUserByEmail(email);

  if (!findUser || findUser.password !== password) {
    return res.status(BAD_REQUEST).json({ message: INVALID_FIELDS });
  }
  
  return next();
};

module.exports = { loginValidationError, isValidEntries };