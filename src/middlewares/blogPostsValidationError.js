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

module.exports = {
  postValidationError,
  categoryExistsValidation,
};