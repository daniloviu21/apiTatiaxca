const pool = require('../config/db');

class Roles {

    static async getRoles() {
        const result = await pool.query('SELECT * FROM roles WHERE deleted_at IS NULL');
        return result.rows;
    }

    static async create(data) {
        const {rol, descripcion} = data;
        const result = await pool.query('INSERT INTO roles (rol, descripcion) VALUES ($1, $2) RETURNING *', [rol, descripcion]);
        return result.rows[0];
    }

    static async update(id, data){
        const {rol,descripcion} = data;
        const result = await pool.query('UPDATE roles SET rol = $1, descripcion = $2, updated_at = now() WHERE id = $3 and deleted_at is null RETURNING *', [rol, descripcion, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE roles SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = Roles;