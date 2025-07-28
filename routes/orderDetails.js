const express = require('express');
const OrderDetailsController = require('../controllers/orderDetailsController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/order-details', authMiddleware.authenticateToken, OrderDetailsController.getAll);
router.get('/order-details/:id', authMiddleware.authenticateToken, OrderDetailsController.getByOrder);
router.post('/order-details', authMiddleware.authenticateToken, OrderDetailsController.create);
router.put('/order-details/:id', authMiddleware.authenticateToken, OrderDetailsController.update);
router.put('/order-details/:id/estado', authMiddleware.authenticateToken, OrderDetailsController.updateEstado);
router.delete('/order-details/:id', authMiddleware.authenticateToken, OrderDetailsController.delete);

module.exports = router;