const pool = require('../config/db');

class MenuSupplies {

    static async getAll() {
        const result = await pool.query('SELECT * FROM menu_insumos');
        return result.rows;
    }

    static async getByMenuId(id_menu) {
        const result = await pool.query('SELECT * FROM menu_insumos WHERE id_menu = $1', [id_menu]);
        return result.rows;
    }

    static async create(data, client = pool) {
        const { id_menu, id_insumo, cantidad } = data;
        const result = await client.query(`INSERT INTO menu_insumos (id_menu, id_insumo, cantidad) VALUES ($1, $2, $3) RETURNING *`, [id_menu, id_insumo, cantidad]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { id_menu, id_insumo, cantidad } = data;
        const result = await pool.query(`UPDATE menu_insumos SET id_menu = $1, id_insumo = $2, cantidad = $3 WHERE id = $4 RETURNING *`, [id_menu, id_insumo, cantidad, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM menu_insumos WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async deleteByMenuId(id_menu, client = pool) {
        await client.query('DELETE FROM menu_insumos WHERE id_menu = $1', [id_menu]);
    }

    static async getByMenuIdWithNames(id_menu) {
        const result = await pool.query(`SELECT mi.cantidad, s.nombre, s.unidad FROM menu_insumos mi
            INNER JOIN insumos s ON mi.id_insumo = s.id WHERE mi.id_menu = $1`, [id_menu]);
        return result.rows;
    }

}

module.exports = MenuSupplies;