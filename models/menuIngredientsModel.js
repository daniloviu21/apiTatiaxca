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

    static async create(data, client = pool) {
        const { id_menu, id_ingrediente, cantidad } = data;
        const result = await client.query(`INSERT INTO menu_ingredientes (id_menu, id_ingrediente, cantidad) VALUES ($1, $2, $3) RETURNING *`,[id_menu, id_ingrediente, cantidad]);
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

    static async deleteByMenuId(id_menu, client = pool) {
        await client.query('DELETE FROM menu_ingredientes WHERE id_menu = $1', [id_menu]);
    }

    static async getByMenuIdWithNames(id_menu) {
        const result = await pool.query(`SELECT mi.cantidad, i.nombre FROM menu_ingredientes mi
            INNER JOIN ingredientes i ON mi.id_ingrediente = i.id WHERE mi.id_menu = $1`, [id_menu]);
        return result.rows;
    }

}

module.exports = MenuIngredients;