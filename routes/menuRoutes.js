const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');
const authMiddleware = require('../config/authMiddleware');

router.get('/menu', authMiddleware.authenticateToken, MenuController.getAll);
router.post('/menu', authMiddleware.authenticateToken, MenuController.create);
router.put('/menu/:id', authMiddleware.authenticateToken, MenuController.update);
router.delete('/menu/:id', authMiddleware.authenticateToken, MenuController.delete);
router.get('/menu/:id/details', authMiddleware.authenticateToken, MenuController.getDetails);
router.get('/menu/by-category', authMiddleware.authenticateToken, MenuController.getGroupedByCategory);

module.exports = router;