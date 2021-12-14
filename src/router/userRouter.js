const router = require('express').Router();
const userController = require('../controllers/userController');
const userValidationError = require('../middlewares/userValidationError');
const tokenValidation = require('../middlewares/tokenValidation');

router.post('/', userValidationError, userController.createUser);
router.get('/', tokenValidation, userController.getAllUsers);
router.get('/:id', tokenValidation, userController.getById);
router.delete('/me', tokenValidation, userController.excludeUser);

module.exports = router;