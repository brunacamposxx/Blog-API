const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { STATUS_CODE_BAD_REQUEST, STATUS_CODE_OK } = require('../helpers');
const userService = require('../services/userService');

const JWT_SECRET = 'hardcoded-secret';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  const findUserByEmail = await userService.getUserByEmail(email);
  console.log(findUserByEmail);

  // console.log(findUserByEmail);
  if (!findUserByEmail || findUserByEmail.password !== password) {
    return res.status(STATUS_CODE_BAD_REQUEST).json({
      message: 'Invalid fields',
    });
  }

  // console.log(findUserByEmail);
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return res.status(STATUS_CODE_OK).json({ token });
});

module.exports = { login };