const { BlogPost, User, Category } = require('../models');

const createPost = async ({ title, content, userId }) => {
  const post = await BlogPost.create({ title, content, userId });
  // console.log(post);
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
  // if (id !== )
  
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