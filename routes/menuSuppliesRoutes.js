const express = require('express');
const MenuSuppliesController = require('../controllers/menuSuppliesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/menu-insumos', authMiddleware.authenticateToken, MenuSuppliesController.getAll);
router.get('/menu-insumos/menu/:id', authMiddleware.authenticateToken, MenuSuppliesController.getByMenu);
router.post('/menu-insumos', authMiddleware.authenticateToken, MenuSuppliesController.create);
router.put('/menu-insumos/:id', authMiddleware.authenticateToken, MenuSuppliesController.update);
router.delete('/menu-insumos/:id', authMiddleware.authenticateToken, MenuSuppliesController.delete);

module.exports = router;