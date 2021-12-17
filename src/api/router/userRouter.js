const router = require('express').Router();
const userController = require('../../controllers/userController');
const { userValidationError, userAlreadyRegistered } = require('../../middlewares/userValidationError');
const validateJWT = require('../auth/validateJWT');

router.post('/', userValidationError, userAlreadyRegistered, userController.createUser);
router.get('/', validateJWT, userController.getAllUsers);
router.get('/:id', validateJWT, userController.getById);
router.delete('/me', validateJWT, userController.excludeUser);

module.exports = router;