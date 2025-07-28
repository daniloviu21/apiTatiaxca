const express = require('express');
const SalesController = require('../controllers/salesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/sales', authMiddleware.authenticateToken, SalesController.getAll);
router.get('/sales/:id', authMiddleware.authenticateToken, SalesController.getById);
router.post('/sales', authMiddleware.authenticateToken, SalesController.create);
router.put('/sales/:id', authMiddleware.authenticateToken, SalesController.update);
router.delete('/sales/:id', authMiddleware.authenticateToken, SalesController.delete);

module.exports = router;