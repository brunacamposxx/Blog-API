const rescue = require('express-rescue');
const { STATUS_CODE_OK } = require('../helpers');
const generateToken = require('../api/auth/auth.js');

const login = rescue(async (req, res) => {
  const { email } = req.body;

  const token = generateToken(email);
  return res.status(STATUS_CODE_OK).json({ token });
});

module.exports = { login };