const express = require('express');
const TablesController = require('../controllers/tablesController');
const router = express.Router();

router.get('/tables', TablesController.getAllTables);
router.post('/tables', TablesController.createTable);
router.put('/tables/:id', TablesController.updateTable);
router.delete('/tables/:id', TablesController.deleteTable);

module.exports = router;