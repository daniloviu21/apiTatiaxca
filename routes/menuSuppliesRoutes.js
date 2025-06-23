const express = require('express');
const MenuSuppliesController = require('../controllers/menuSuppliesController');
const router = express.Router();

router.get('/menu-insumos', MenuSuppliesController.getAll);
router.get('/menu-insumos/menu/:id', MenuSuppliesController.getByMenu);
router.post('/menu-insumos', MenuSuppliesController.create);
router.put('/menu-insumos/:id', MenuSuppliesController.update);
router.delete('/menu-insumos/:id', MenuSuppliesController.delete);

module.exports = router;