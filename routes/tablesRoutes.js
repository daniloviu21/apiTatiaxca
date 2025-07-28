const express = require('express');
const TablesController = require('../controllers/tablesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/tables', authMiddleware.authenticateToken, TablesController.getAllTables);
router.get('/tables/:id', authMiddleware.authenticateToken, TablesController.getTableById);
router.post('/tables', authMiddleware.authenticateToken, TablesController.createTable);
router.put('/tables/:id', authMiddleware.authenticateToken, TablesController.updateTable);
router.put('/tables/:id/restore', authMiddleware.authenticateToken, TablesController.restoreTable);
router.delete('/tables/:id', authMiddleware.authenticateToken, TablesController.deleteTable);

module.exports = router;