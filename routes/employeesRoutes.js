const express = require('express');
const EmployeesController = require('../controllers/employeesController');
const router = express.Router();

router.get('/employees', EmployeesController.getAllEmployees);
router.get('/employees/:id', EmployeesController.getEmployeeById);
router.post('/employees', EmployeesController.createEmployee);
router.put('/employees/:id', EmployeesController.updateEmployee);
router.delete('/employees/:id', EmployeesController.deleteEmployeeAndUser);

module.exports = router;