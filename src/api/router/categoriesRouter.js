const router = require('express').Router();
const categoryController = require('../../controllers/categoryController');
const validateJWT = require('../auth/validateJWT');

router.post('/', validateJWT, categoryController.createCategory);
router.get('/', validateJWT, categoryController.getCategories);

module.exports = router;
