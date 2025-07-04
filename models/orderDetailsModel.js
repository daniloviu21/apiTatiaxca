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
            c.nombre AS categoria
        FROM detalle_ordenes d
        LEFT JOIN menu p ON d.id_menu = p.id
        LEFT JOIN categorias c ON p.id_categoria = c.id
        WHERE d.id_orden = $1
        `;
        const result = await pool.query(query, [id_orden]);
        return result.rows;
    }

    static async create(data, client = pool) {
        const { id_menu, id_orden, cantidad, subtotal, comentario } = data;
        const result = await client.query(`INSERT INTO detalle_ordenes (id_menu, id_orden, cantidad, subtotal, comentario) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [id_menu, id_orden, cantidad, subtotal, comentario]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { id_menu, id_orden, cantidad, subtotal, comentario } = data;
        const result = await pool.query(`UPDATE detalle_ordenes SET id_menu = $1, id_orden = $2, cantidad = $3, subtotal = $4, comentario = $5 WHERE id = $6 RETURNING *`, [id_menu, id_orden, cantidad, subtotal, comentario, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM detalle_ordenes WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = OrderDetails;