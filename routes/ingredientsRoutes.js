const express = require('express');
const IngredientsController = require('../controllers/ingredientsController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/ingredients', authMiddleware.authenticateToken, IngredientsController.getAllIngredients);
router.post('/ingredients', authMiddleware.authenticateToken, IngredientsController.createIngredient);
router.put('/ingredients/:id', authMiddleware.authenticateToken, IngredientsController.updateIngredient);
router.put('/ingredients/activate/:id', authMiddleware.authenticateToken, IngredientsController.activateIngredient);
router.delete('/ingredients/:id', authMiddleware.authenticateToken, IngredientsController.deleteIngredient);

module.exports = router;