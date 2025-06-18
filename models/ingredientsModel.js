const pool = require('../config/db');

class Ingredients {

    static async getIngredients() {
        const result = await pool.query('SELECT * FROM ingredientes');
        return result.rows;
    }

    static async create(data) {
        const {nombre, unidad, stock} = data;
        const result = await pool.query('INSERT INTO ingredientes (nombre, unidad, stock) VALUES ($1, $2, $3) RETURNING *', [nombre, unidad, stock]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombre, unidad, stock} = data;
        const result = await pool.query('UPDATE ingredientes SET nombre = $1, unidad = $2, stock = $3, updated_at = now() WHERE id = $4 and deleted_at is null RETURNING *', [nombre, unidad, stock, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE ingredientes SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = Ingredients;