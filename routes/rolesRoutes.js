const express = require('express');
const RolesController = require('../controllers/rolesController');
const router = express.Router();

router.get('/roles', RolesController.getAllRoles);
router.post('/roles', RolesController.createRole);
router.put('/roles/:id', RolesController.updateRole);
router.delete('/roles/:id', RolesController.deleteRole);

module.exports = router;roles