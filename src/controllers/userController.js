// const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const userService = require('../services/userService');
const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../helpers/index.js');
const generateToken = require('../api/auth/auth.js');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  await userService.createUser({ displayName, email, password, image });
  
  const token = generateToken(email);
  return res.status(STATUS_CODE_CREATED).json({ token });
});

const getById = rescue(async (req, res) => {
  const user = await userService.getById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
    return res.status(STATUS_CODE_OK).json(user);
});

const getAllUsers = rescue(async (req, res) => {
  const allUsers = await userService.getAllUsers();
    return res.status(STATUS_CODE_OK).json(allUsers);
});

const excludeUser = rescue(async (req, res) => {
  const { id } = req.user;

  const user = await userService.excludeUser(id);
  return res.status(204).json(user);
});

module.exports = {
  createUser,
  getById,
  getAllUsers,
  excludeUser,
};