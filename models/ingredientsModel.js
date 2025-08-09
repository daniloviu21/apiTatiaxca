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

    static async descontarPorMenuFiltrado(id_menu, cantidad, omitidos = [], client = pool) {
        const query = `SELECT i.id, i.stock, mi.cantidad, i.nombre FROM menu_ingredientes mi JOIN ingredientes i ON mi.id_ingrediente = i.id WHERE mi.id_menu = $1`;
        const result = await client.query(query, [id_menu]);

        const omitidosNormalizados = omitidos.map(n => n.trim().toLowerCase());

        for (const row of result.rows) {
            const nombreNormalizado = row.nombre.trim().toLowerCase();
            if (!omitidosNormalizados.includes(nombreNormalizado)) {
                const cantidadDescontar = row.cantidad * cantidad;
                await client.query(`UPDATE ingredientes SET stock = GREATEST(stock - $1, 0), deleted_at = CASE WHEN (stock - $1) <= 0 THEN now() ELSE deleted_at END WHERE id = $2`, [cantidadDescontar, row.id]);
            }
        }
    }

    static async activar(id){
        const result = await pool.query(`UPDATE ingredientes SET deleted_at = null, updated_at = now() WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0];
    }

}

module.exports = Ingredients;