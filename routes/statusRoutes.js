const express = require('express');
const StatusController = require('../controllers/statusController');
const router = express.Router();

router.get('/status', StatusController.getAllStatus);
router.post('/status', StatusController.createStatus);
router.put('/status/:id', StatusController.updateStatus);
router.delete('/status/:id', StatusController.deleteStatus);

module.exports = router;