const express = require('express');
const IngredientsController = require('../controllers/ingredientsController');
const router = express.Router();

router.get('/ingredients', IngredientsController.getAllIngredients);
router.post('/ingredients', IngredientsController.createIngredient);
router.put('/ingredients/:id', IngredientsController.updateIngredient);
router.delete('/ingredients/:id', IngredientsController.deleteIngredient);

module.exports = router;