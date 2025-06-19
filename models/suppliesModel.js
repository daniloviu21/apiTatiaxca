const pool = require('../config/db');

class Supplies {

    static async getSupplies() {
        const result = await pool.query('SELECT * FROM insumos');
        return result.rows;
    }

    static async create(data) {
        const {nombre, unidad, stock} = data;
        const result = await pool.query('INSERT INTO insumos (nombre, unidad, stock) VALUES ($1, $2, $3) RETURNING *', [nombre, unidad, stock]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombre, unidad, stock} = data;
        const result = await pool.query('UPDATE insumos SET nombre = $1, unidad = $2, stock = $3, updated_at = now() WHERE id = $4 and deleted_at is null RETURNING *', [nombre, unidad, stock, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE insumos SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = Supplies;