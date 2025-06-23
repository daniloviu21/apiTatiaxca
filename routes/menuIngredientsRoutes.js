const express = require('express');
const MenuIngredientsController = require('../controllers/menuIngredientsController');
const router = express.Router();

router.get('/menu-ingredientes', MenuIngredientsController.getAll);
router.get('/menu-ingredientes/menu/:id', MenuIngredientsController.getByMenu);
router.post('/menu-ingredientes', MenuIngredientsController.create);
router.put('/menu-ingredientes/:id', MenuIngredientsController.update);
router.delete('/menu-ingredientes/:id', MenuIngredientsController.delete);

module.exports = router;