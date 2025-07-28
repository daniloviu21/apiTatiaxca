const express = require('express');
const DetailOrdersController = require('../controllers/detailOrdersController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/detail-orders', authMiddleware.authenticateToken, DetailOrdersController.getAll);
router.get('/detail-orders/order/:id', authMiddleware.authenticateToken, DetailOrdersController.getByOrder);
router.post('/detail-orders', authMiddleware.authenticateToken, DetailOrdersController.create);
router.put('/detail-orders/:id', authMiddleware.authenticateToken, DetailOrdersController.update);
router.delete('/detail-orders/:id', authMiddleware.authenticateToken, DetailOrdersController.delete);

module.exports = router;