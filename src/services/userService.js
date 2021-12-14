const { User } = require('../models');
// const {} = require('../helpers/index');

const createUser = async ({ displayName, email, password, image }) => {
  await User.create({ displayName, email, password, image });
};

const getUserByEmail = async (email) => {
  const findUser = await User.findOne({ where: { email } });
  return findUser;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return allUsers;
};

const getById = async (id) => {
  const getUserById = await User.findByPk(id);
  return getUserById;
};

const excludeUser = async (id) => {
  const excludedUser = await User.destroy({ where: { id } });
  return excludedUser;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getById,
  excludeUser,
};