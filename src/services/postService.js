// const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const createPost = async ({ title, content, userId }) => {
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
  const findById = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Category, as: 'categories' },
    ],
  });
  return findById.update({ title, content });
};

const excludePost = async ({ id }) => {
  const findById = await BlogPost.findOne({
    where: { id },
  });
  if (!findById) return null;

  return findById.destroy();
};

const getByQuery = async ({ q }) => {
  const blogPosts = await getPosts();

  if (!q) return blogPosts;

  const search = blogPosts.filter(
    (post) => post.title.includes(q) || post.content.includes(q),
  );

  return search;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  excludePost,
  getByQuery,
};