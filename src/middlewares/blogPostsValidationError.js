const Joi = require('joi');
const { getCategoryById } = require('../services/categoryService');

const schema = Joi.object({
  title: Joi.string().not().empty()
  .required(),
  content: Joi.string().not().empty()
  .required(),
  categoryIds: Joi.array().not().empty()
  .required(),
});

const postValidationError = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  return next();
};

 // função de validação de categoryIds feita com ajuda do @miguelbrn
const categoryExistsValidation = async (req, res, next) => {
  const { categoryIds } = req.body;

  const listCategories = await Promise.all(
    categoryIds.map(async (id) => getCategoryById(id)),
  );

  if (listCategories.some((category) => !category)) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const unauthUser = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  if (id !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

const requiredFields = async (req, res, next) => {
  const { content, title } = req.body;
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  console.log('cheguei aqui no middleware do content e title');
  next();
};

module.exports = {
  postValidationError,
  categoryExistsValidation,
  unauthUser,
  requiredFields,
};