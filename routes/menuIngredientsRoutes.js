const express = require('express');
const MenuIngredientsController = require('../controllers/menuIngredientsController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/menu-ingredientes', authMiddleware.authenticateToken, MenuIngredientsController.getAll);
router.get('/menu-ingredientes/menu/:id', authMiddleware.authenticateToken, MenuIngredientsController.getByMenu);
router.post('/menu-ingredientes', authMiddleware.authenticateToken, MenuIngredientsController.create);
router.put('/menu-ingredientes/:id', authMiddleware.authenticateToken, MenuIngredientsController.update);
router.delete('/menu-ingredientes/:id', authMiddleware.authenticateToken, MenuIngredientsController.delete);

module.exports = router;