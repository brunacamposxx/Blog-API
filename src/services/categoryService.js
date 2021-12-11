const { Category } = require('../models');

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (id) => Category.findOne({ where: { id }, raw: true });

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
};
