const express = require('express');
const SuppliesController = require('../controllers/suppliesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/supplies', authMiddleware.authenticateToken, SuppliesController.getAllSupplies);
router.post('/supplies', authMiddleware.authenticateToken, SuppliesController.createSupplies);
router.put('/supplies/:id', authMiddleware.authenticateToken, SuppliesController.updatesupplys);
router.put('/supplies/activate/:id', authMiddleware.authenticateToken, SuppliesController.activateSupply);
router.delete('/supplies/:id', authMiddleware.authenticateToken, SuppliesController.deleteSupplies);

module.exports = router;