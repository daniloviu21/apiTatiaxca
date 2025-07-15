const pool = require('../config/db');

class Orders {

    static async getAll() {
        const result = await pool.query(`SELECT o.*, m.numero AS table_number, e.nombre AS waiter_name, s.estado AS status FROM ordenes o
        LEFT JOIN mesas m ON o.id_mesa = m.id
        LEFT JOIN empleados e ON o.id_mesero = e.id
        LEFT JOIN estatus s ON o.id_estatus = s.id
        WHERE o.deleted_at IS NULL ORDER BY o.id DESC`);
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query(`SELECT * FROM ordenes WHERE id = $1 AND deleted_at IS NULL`, [id]);
        return result.rows[0];
    }

    static async create(data) {
        const {fecha,total,propina,descuento,tipo_cliente,id_estatus,id_mesa,id_mesero} = data;
        const result = await pool.query(`INSERT INTO ordenes (fecha, total, propina, descuento, tipo_cliente,id_estatus, id_mesa, id_mesero) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [fecha, total, propina, descuento, tipo_cliente, id_estatus, id_mesa, id_mesero]);
        return result.rows[0];
    }

    static async update(id, data) {
        const {fecha,total,propina,descuento,tipo_cliente,id_estatus,id_mesa,id_mesero} = data;
        const result = await pool.query(`UPDATE ordenes SET fecha = $1, total = $2, propina = $3, descuento = $4, tipo_cliente = $5, id_estatus = $6, id_mesa = $7, id_mesero = $8, updated_at = NOW() WHERE id = $9 AND deleted_at IS NULL RETURNING *`, [fecha, total, propina, descuento, tipo_cliente, id_estatus, id_mesa, id_mesero, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(`UPDATE ordenes SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING *`, [id]);
        return result.rows[0];
    }

    static async recalcularTotal(id_orden, client = pool) {
        const result = await client.query(
            `SELECT COALESCE(SUM(subtotal), 0) AS total FROM detalle_ordenes WHERE id_orden = $1`,
            [id_orden]
        );

        const total = parseFloat(result.rows[0].total);

        const update = await client.query(
            `UPDATE ordenes SET total = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
            [total, id_orden]
        );

        return update.rows[0];
    }

    static async getActiveOrderByTable(id_mesa) {
        const query = `SELECT * FROM ordenes WHERE id_mesa = $1 AND id_estatus IN (1, 2) AND deleted_at IS NULL ORDER BY id DESC LIMIT 1`;
        const result = await pool.query(query, [id_mesa]);
        return result.rows[0];
    }
    
}

module.exports = Orders;