const express = require('express');
const DetailOrdersController = require('../controllers/detailOrdersController');
const router = express.Router();

router.get('/detail-orders', DetailOrdersController.getAll);
router.get('/detail-orders/order/:id', DetailOrdersController.getByOrder);
router.post('/detail-orders', DetailOrdersController.create);
router.put('/detail-orders/:id', DetailOrdersController.update);
router.delete('/detail-orders/:id', DetailOrdersController.delete);

module.exports = router;