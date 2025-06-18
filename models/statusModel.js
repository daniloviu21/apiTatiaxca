const pool = require('../config/db');

class Status {

    static async getStatus() {
        const result = await pool.query('SELECT * FROM estatus');
        return result.rows;
    }

    static async create(data) {
        const {estado, descripcion} = data;
        const result = await pool.query('INSERT INTO estatus (estado, descripcion) VALUES ($1, $2) RETURNING *', [estado, descripcion]);
        return result.rows[0];
    }

    static async update(id, data){
        const {estado,descripcion} = data;
        const result = await pool.query('UPDATE estatus SET estado = $1, descripcion = $2, updated_at = now() WHERE id = $3 and deleted_at is null RETURNING *', [estado, descripcion, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE estatus SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = Status;