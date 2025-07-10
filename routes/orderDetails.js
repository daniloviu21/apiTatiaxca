const express = require('express');
const OrderDetailsController = require('../controllers/orderDetailsController');
const router = express.Router();

router.get('/order-details', OrderDetailsController.getAll);
router.get('/order-details/:id', OrderDetailsController.getByOrder);
router.post('/order-details', OrderDetailsController.create);
router.put('/order-details/:id', OrderDetailsController.update);
router.put('/order-details/:id/estado', OrderDetailsController.updateEstado);
router.delete('/order-details/:id', OrderDetailsController.delete);

module.exports = router;