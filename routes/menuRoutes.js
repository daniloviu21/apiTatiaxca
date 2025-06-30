const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menuController');

router.get('/menu', MenuController.getAll);
router.post('/menu', MenuController.create);
router.put('/menu/:id', MenuController.update);
router.delete('/menu/:id', MenuController.delete);
router.get('/menu/:id/details', MenuController.getDetails);
router.get('/menu/by-category', MenuController.getGroupedByCategory);

module.exports = router;