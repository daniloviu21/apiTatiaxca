const express = require('express');
const SalesController = require('../controllers/salesController');
const router = express.Router();

router.get('/sales', SalesController.getAll);
router.get('/sales/:id', SalesController.getById);
router.post('/sales', SalesController.create);
router.put('/sales/:id', SalesController.update);
router.delete('/sales/:id', SalesController.delete);

module.exports = router;