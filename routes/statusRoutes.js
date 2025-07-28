const express = require('express');
const StatusController = require('../controllers/statusController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/status', authMiddleware.authenticateToken, StatusController.getAllStatus);
router.post('/status', authMiddleware.authenticateToken, StatusController.createStatus);
router.put('/status/:id', authMiddleware.authenticateToken, StatusController.updateStatus);
router.delete('/status/:id', authMiddleware.authenticateToken, StatusController.deleteStatus);

module.exports = router;