const express = require('express');
const EmployeesController = require('../controllers/employeesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/employees', authMiddleware.authenticateToken, EmployeesController.getAllEmployees);
router.get('/employees/:id', authMiddleware.authenticateToken, EmployeesController.getEmployeeById);
router.post('/employees', authMiddleware.authenticateToken, EmployeesController.createEmployee);
router.put('/employees/:id', authMiddleware.authenticateToken, EmployeesController.updateEmployee);
router.delete('/employees/:id', authMiddleware.authenticateToken, EmployeesController.deleteEmployeeAndUser);

module.exports = router;