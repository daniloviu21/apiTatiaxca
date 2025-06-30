const pool = require('../config/db');

class Employees {

    static async getEmployees() {
    const result = await pool.query(`
        SELECT e.id,e.nombre,e.apPaterno,e.apMaterno,e.telefono,u.correo,r.rol AS rol FROM empleados e
        JOIN usuarios u ON e.id_usuario = u.id
        JOIN roles r ON u.id_rol = r.id
        WHERE e.deleted_at IS NULL`);
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { nombre, apPaterno, apMaterno, telefono, id_usuario } = data;
        const result = await pool.query('INSERT INTO empleados (nombre, apPaterno, apMaterno, telefono, id_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',[nombre, apPaterno, apMaterno, telefono, id_usuario]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre, apPaterno, apMaterno, telefono, id_usuario } = data;
        const result = await pool.query(`UPDATE empleados SET nombre = $1, apPaterno = $2, apMaterno = $3, telefono = $4, id_usuario = $5, updated_at = now() WHERE id = $6 AND deleted_at IS NULL RETURNING *`,[nombre, apPaterno, apMaterno, telefono, id_usuario, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('UPDATE empleados SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = Employees;