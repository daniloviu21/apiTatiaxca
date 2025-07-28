const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/ordersController');
const authMiddleware = require('../config/authMiddleware');

router.get('/orders', authMiddleware.authenticateToken, OrdersController.getAllOrders);
router.get('/orders/:id', authMiddleware.authenticateToken, OrdersController.getOrderById);
router.get('/orders/mesa/:id_mesa', authMiddleware.authenticateToken, OrdersController.getActiveByTable);
router.post('/orders', authMiddleware.authenticateToken, OrdersController.createOrder);
router.post('/orders/full', authMiddleware.authenticateToken, OrdersController.createOrderWithDetails);
router.put('/orders/:id', authMiddleware.authenticateToken, OrdersController.updateOrder);
router.delete('/orders/:id', authMiddleware.authenticateToken, OrdersController.deleteOrder);

module.exports = router;