const router = require('express').Router();
const loginController = require('../../controllers/loginController');
const { loginValidationError, isValidEntries } = require('../../middlewares/loginValidationError');

router.post('/', loginValidationError, isValidEntries, loginController.login);

module.exports = router;
