const { BlogPost, User, Category } = require('../models');
// const { ERROR_CATEGORY_NOT_FOUND } = require('../helpers');

// const checkCategoryExists = async (categoryIds) => {
//   const categoryExists = await User.findOne({ where: { id: categoryIds } });
//   if (categoryExists.length === categoryIds.length) { return true; }
//   return false;
// };

const createPost = async ({ title, content, categoryIds, userId = 1 }) => {
  console.log(categoryIds);
  // const categoryExists = await checkCategoryExists(categoryIds);
  // console.log(categoryExists);
  // if (!categoryExists) { throw ERROR_CATEGORY_NOT_FOUND; }

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