const express = require('express');
const TablesController = require('../controllers/tablesController');
const router = express.Router();

router.get('/tables', TablesController.getAllTables);
router.get('/tables/:id', TablesController.getTableById);
router.post('/tables', TablesController.createTable);
router.put('/tables/:id', TablesController.updateTable);
router.put('/tables/:id/restore', TablesController.restoreTable);
router.delete('/tables/:id', TablesController.deleteTable);

module.exports = router;