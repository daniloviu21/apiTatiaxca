const pool = require('../config/db');

class Tables {

    static async getTables() {
        const result = await pool.query('SELECT * FROM mesas');
        return result.rows;
    }

    static async create(data) {
        const {numero, ubicacion, estado} = data;
        const result = await pool.query('INSERT INTO mesas (numero, ubicacion, estado) VALUES ($1, $2, $3) RETURNING *', [numero, ubicacion, estado]);
        return result.rows[0];
    }

    static async update(id, data){
        const {numero, ubicacion, estado} = data;
        const result = await pool.query('UPDATE mesas SET numero = $1, ubicacion = $2, estado = $3, updated_at = now() WHERE id = $4 and deleted_at is null RETURNING *', [numero, ubicacion, estado, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE mesas SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = Tables;