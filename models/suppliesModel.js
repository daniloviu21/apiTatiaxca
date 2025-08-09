const pool = require('../config/db');

class Supplies {

    static async getSupplies() {
        const result = await pool.query('SELECT * FROM insumos');
        return result.rows;
    }

    static async create(data) {
        const {nombre, unidad, stock, es_desechable} = data;
        const result = await pool.query('INSERT INTO insumos (nombre, unidad, stock, es_desechable) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, unidad, stock, es_desechable]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombre, unidad, stock, es_desechable} = data;
        const result = await pool.query('UPDATE insumos SET nombre = $1, unidad = $2, stock = $3, es_desechable = $4, updated_at = now() WHERE id = $5 and deleted_at is null RETURNING *', [nombre, unidad, stock, es_desechable, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE insumos SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

    static async descontarPorMenu(id_menu, cantidad, client = pool) {
        const query = `SELECT i.id, i.stock, mi.cantidad, i.nombre FROM menu_insumos mi JOIN insumos i ON mi.id_insumo = i.id WHERE mi.id_menu = $1 AND i.es_desechable = false AND i.deleted_at IS NULL`;
        const result = await client.query(query, [id_menu]);

        for (const row of result.rows) {
            const cantidadDescontar = row.cantidad * cantidad;
            await client.query(`UPDATE insumos SET stock = GREATEST(stock - $1, 0), deleted_at = CASE WHEN (stock - $1) <= 0 THEN now() ELSE deleted_at END WHERE id = $2`, [cantidadDescontar, row.id]);
        }
    }

    static async descontarDesechablesPorMenu(id_menu, cantidad, client = pool) {
        const query = `SELECT i.id, i.stock, mi.cantidad, i.nombre FROM menu_insumos mi JOIN insumos i ON mi.id_insumo = i.id WHERE mi.id_menu = $1 AND i.es_desechable = true AND i.deleted_at IS NULL`;
        const result = await client.query(query, [id_menu]);

        for (const row of result.rows) {
            const cantidadDescontar = row.cantidad * cantidad;
            await client.query(`UPDATE insumos SET stock = GREATEST(stock - $1, 0), deleted_at = CASE WHEN (stock - $1) <= 0 THEN now() ELSE deleted_at END WHERE id = $2`, [cantidadDescontar, row.id]);
        }
    }

    static async activar(id){
        const result = await pool.query(`UPDATE insumos SET deleted_at = null, updated_at = now() WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0];
    }

}

module.exports = Supplies;