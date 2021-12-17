const router = require('express').Router();
const postController = require('../../controllers/postController');
const validateJWT = require('../auth/validateJWT');
const { 
  postValidationError, 
  categoryExistsValidation,
  requiredFields,
} = require('../../middlewares/blogPostsValidationError');

router.get('/search', validateJWT, postController.getByQuery);

router.post('/', 
validateJWT, 
postValidationError, 
categoryExistsValidation,
postController.createPost);
router.get('/', validateJWT, postController.getPosts);
router.get('/:id', validateJWT, postController.getPostById);
router.put('/:id', validateJWT, requiredFields, postController.updatePost);
router.delete('/:id', validateJWT, postController.excludePost);

module.exports = router;
