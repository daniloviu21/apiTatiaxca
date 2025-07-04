const pool = require('../config/db');

class DetailOrders {

    static async getAll() {
        const result = await pool.query('SELECT * FROM detalle_ordenes');
        return result.rows;
    }

    static async getByOrderId(orderId) {
        const result = await pool.query('SELECT * FROM detalle_ordenes WHERE id = $1', [orderId]);
        return result.rows;
    }

    static async create(data) {
        const { id_menu, id_order, quantity, subtotal } = data;
        const result = await pool.query(`INSERT INTO detalle_ordenes (id_menu, id_order, quantity, subtotal) VALUES ($1, $2, $3, $4) RETURNING *`,[id_menu, id_order, quantity, subtotal]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { id_menu, id_order, quantity, subtotal } = data;
        const result = await pool.query(`UPDATE detalle_ordenes SET id_menu = $1, id_order = $2, quantity = $3, subtotal = $4 WHERE id = $5 RETURNING *`,[id_menu, id_order, quantity, subtotal, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM detalle_ordenes WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = DetailOrders;