const { BlogPost, User, Category } = require('../models');
const { ERROR_CATEGORY_NOT_FOUND } = require('../helpers');

// função do checkCategoryExists com ajuda do @miguelbrn
const checkCategoryExists = async (categoryIds) => {
  const listCategories = await Promise.all(categoryIds.map(async (id) => {
    Category.findOne(
      { where: { id }, raw: true },
    ); 
  }));
  if (listCategories.some((category) => !category)) { throw ERROR_CATEGORY_NOT_FOUND; }
};

const createPost = async ({ title, content, categoryIds, id: userId }) => {
  // console.log(categoryIds);
  await checkCategoryExists(categoryIds);
  // console.log(categoryExists2);
  // if (categoryExists2) { throw ERROR_CATEGORY_NOT_FOUND; }

  const post = await BlogPost.create({ title, content, userId });
  
  return post;
};

const getPosts = async () => {
  const blogPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories' },
  ] });
  return blogPosts;
};

const getPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ] });
  return blogPost;
};

const updatePost = async ({ id, title, content }) => {
  const blogPosts = await BlogPost.update({
    title,
    content,
  },
  { where: { id } });
  return blogPosts;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
};