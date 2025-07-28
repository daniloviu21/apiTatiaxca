const express = require('express');
const CategoriesController = require('../controllers/categoriesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/categories', authMiddleware.authenticateToken, CategoriesController.getAllCategories);
router.post('/categories', authMiddleware.authenticateToken, CategoriesController.createCategorie);
router.put('/categories/:id', authMiddleware.authenticateToken, CategoriesController.updateCategorie);
router.delete('/categories/:id', authMiddleware.authenticateToken, CategoriesController.deleteCategorie);

module.exports = router;