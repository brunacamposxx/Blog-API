const rescue = require('express-rescue');
const postService = require('../services/postService');
const { STATUS_CODE_CREATED, STATUS_CODE_OK } = require('../helpers');

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const userId = id;
  const newPost = await postService.createPost({ title, content, userId });

  return res.status(STATUS_CODE_CREATED).json(newPost);
});

const getPosts = rescue(async (req, res) => {
  const posts = await postService.getPosts();
  return res.status(STATUS_CODE_OK).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const posts = await postService.getPostById(req.params.id);
  if (!posts) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(STATUS_CODE_OK).json(posts);
});

const updatePost = rescue(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await postService.updatePost({ id, title, content });
  return res.status(STATUS_CODE_OK).json(updatedPost);
});

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
};