const express = require('express');
const CategoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/categories', CategoriesController.getAllCategories);
router.post('/categories', CategoriesController.createCategorie);
router.put('/categories/:id', CategoriesController.updateCategorie);
router.delete('/categories/:id', CategoriesController.deleteCategorie);

module.exports = router;