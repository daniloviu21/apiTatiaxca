const pool = require('../config/db');

class OrderDetails {
    static async getAll() {
        const result = await pool.query('SELECT * FROM detalle_ordenes');
        return result.rows;
    }

    static async getByOrderId(id_orden) {
        const query = `
        SELECT 
            d.id,
            d.id_menu,
            d.id_orden,
            d.cantidad,
            d.subtotal,
            d.comentario,
            d.estado_preparacion,
            p.nombre AS nombre_producto,
            p.imagen_url,
            c.nombre AS categoria
        FROM detalle_ordenes d
        LEFT JOIN menu p ON d.id_menu = p.id
        LEFT JOIN categorias c ON p.id_categoria = c.id
        WHERE d.id_orden = $1
        `;
        const result = await pool.query(query, [id_orden]);
        return result.rows;
    }

    static async findById(id, client = pool) {
        const result = await client.query('SELECT * FROM detalle_ordenes WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async getDetalleById(id, client = pool) {
        const result = await client.query(`SELECT id_menu, cantidad, sin_ingredientes FROM detalle_ordenes WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async create(data, client = pool) {
        const { id_menu, id_orden, cantidad, subtotal, comentario, sin_ingredientes } = data;
        const result = await client.query(`INSERT INTO detalle_ordenes (id_menu, id_orden, cantidad, subtotal, comentario, sin_ingredientes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,[id_menu, id_orden, cantidad, subtotal, comentario, sin_ingredientes || []]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { id_menu, id_orden, cantidad, subtotal, comentario } = data;
        const result = await pool.query(`UPDATE detalle_ordenes SET id_menu = $1, id_orden = $2, cantidad = $3, subtotal = $4, comentario = $5 WHERE id = $6 RETURNING *`, [id_menu, id_orden, cantidad, subtotal, comentario, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('SELECT id_orden FROM detalle_ordenes WHERE id = $1', [id]);
        const idOrden = result.rows[0]?.id_orden;

        await pool.query('DELETE FROM detalle_ordenes WHERE id = $1', [id]);
        const suma = await pool.query('SELECT SUM(subtotal) AS total FROM detalle_ordenes WHERE id_orden = $1',[idOrden]);
        const nuevoTotal = suma.rows[0]?.total || 0;

        await pool.query('UPDATE ordenes SET total = $1 WHERE id = $2', [nuevoTotal, idOrden]);
        return { id_orden: idOrden, nuevoTotal };
    }

    static async updateEstado(id, estado_preparacion) {
        const result = await pool.query(`UPDATE detalle_ordenes SET estado_preparacion = $1 WHERE id = $2 RETURNING *`,[estado_preparacion, id]);
        return result.rows[0];
    }

}

module.exports = OrderDetails;