const pool = require('../config/db');

class MenuIngredients {

    static async getAll() {
        const result = await pool.query('SELECT * FROM menu_ingredientes');
        return result.rows;
    }

    static async getByMenuId(id_menu) {
        const result = await pool.query('SELECT * FROM menu_ingredientes WHERE id_menu = $1', [id_menu]);
        return result.rows;
    }

    static async create(data) {
        const { id_menu, id_ingrediente, cantidad } = data;
        const result = await pool.query(`INSERT INTO menu_ingredientes (id_menu, id_ingrediente, cantidad) VALUES ($1, $2, $3) RETURNING *`, [id_menu, id_ingrediente, cantidad]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { id_menu, id_ingrediente, cantidad } = data;
        const result = await pool.query(`UPDATE menu_ingredientes SET id_menu = $1, id_ingrediente = $2, cantidad = $3 WHERE id = $4 RETURNING *`, [id_menu, id_ingrediente, cantidad, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM menu_ingredientes WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

}

module.exports = MenuIngredients;