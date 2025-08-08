const express = require('express');
const EmployeesController = require('../controllers/employeesController');
const router = express.Router();
const authMiddleware = require('../config/authMiddleware');

router.get('/employees', EmployeesController.getAllEmployees);
router.get('/employees/:id', EmployeesController.getEmployeeById);
router.get('/employees/by-user/:userId', EmployeesController.getEmployeeByUserId);
router.post('/employees', EmployeesController.createEmployee);
router.put('/employees/:id', EmployeesController.updateEmployee);
router.delete('/employees/:id', authMiddleware.authenticateToken, EmployeesController.deleteEmployeeAndUser);

module.exports = router;