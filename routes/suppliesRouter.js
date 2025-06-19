const express = require('express');
const SuppliesController = require('../controllers/suppliesController');
const router = express.Router();

router.get('/supplies', SuppliesController.getAllSupplies);
router.post('/supplies', SuppliesController.createSupplies);
router.put('/supplies/:id', SuppliesController.updatesupplys);
router.delete('/supplies/:id', SuppliesController.deleteSupplies);

module.exports = router;