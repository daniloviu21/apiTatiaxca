const Employees = require('../models/employeesModel');
const Users = require('../models/usersModel');

class EmployeesController {

    static async getAllEmployees(req, res) {
        try {
            const employee = await Employees.getEmployees();
            res.json(employee);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getEmployeeById(req, res) {
        try {
            const employee = await Employees.findById(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: "Empleado no encontrado!" });
            }
            return res.json(employee);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async createEmployee(req, res) {
        const { employee, user } = req.body;

        try {
            if (!employee || !user) {
                return res.status(400).json({ error: 'Empleado y Usuario son requeridos' });
            }

            const newUser = await Users.create(user);
            employee.id_usuario = newUser.id; 
            const newEmployee = await Employees.create(employee);
            res.status(201).json({ employee: newEmployee, user: newUser });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateEmployee(req, res) {
        const { employee, user } = req.body;
        const { id } = req.params; 
        
        try {
            const existingEmployee = await Employees.findById(id);
            if (!existingEmployee) {
                return res.status(404).json({ message: "Empleado no encontrado!" });
            }

            const updatedUser = await Users.update(employee.id_usuario, user);
            const updatedEmployee = await Employees.update(id, employee);
            return res.json({ employee: updatedEmployee, user: updatedUser });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async deleteEmployeeAndUser(req, res) {
        const { id } = req.params; 
        try {
            const employee = await Employees.findById(id);
            if (!employee) {
                return res.status(404).json({ message: "Empleado no encontrado!" });
            }

            const deletedUser = await Users.delete(employee.id_usuario);
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuario no encontrado!" });
            }

            await Employees.delete(id); 
            return res.json({ message: "Empleado y usuario eliminados!" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getEmployeeByUserId(req, res) {
        try {
            const { userId } = req.params;
            const employee = await Employees.findByUserId(userId);
            if (!employee) return res.status(404).json({ message: 'Empleado no encontrado!' });
            return res.json(employee);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = EmployeesController;