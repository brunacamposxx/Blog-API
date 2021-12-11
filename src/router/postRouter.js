const router = require('express').Router();
const postController = require('../controllers/postController');
const tokenValidation = require('../middlewares/tokenValidation');
const { 
  postValidationError, 
  categoryExistsValidation,
} = require('../middlewares/blogPostsValidationError');

router.post('/', tokenValidation, 
postValidationError, 
categoryExistsValidation, postController.createPost);
router.get('/', tokenValidation, postController.getPosts);
router.get('/:id', tokenValidation, postController.getPostById);
router.put('/:id', tokenValidation, postController.updatePost);

module.exports = router;
