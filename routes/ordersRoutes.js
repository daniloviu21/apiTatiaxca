const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/ordersController');

router.get('/orders', OrdersController.getAllOrders);
router.get('/orders/:id', OrdersController.getOrderById);
router.post('/orders', OrdersController.createOrder);
router.post('/orders/full', OrdersController.createOrderWithDetails);
router.put('/orders/:id', OrdersController.updateOrder);
router.delete('/orders/:id', OrdersController.deleteOrder);

module.exports = router;