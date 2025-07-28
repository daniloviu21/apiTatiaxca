const express = require('express');
const RolesController = require('../controllers/rolesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/roles', authMiddleware.authenticateToken, RolesController.getAllRoles);
router.post('/roles', authMiddleware.authenticateToken, RolesController.createRole);
router.put('/roles/:id', authMiddleware.authenticateToken, RolesController.updateRole);
router.delete('/roles/:id', authMiddleware.authenticateToken, RolesController.deleteRole);

module.exports = router;