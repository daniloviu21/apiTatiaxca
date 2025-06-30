const pool = require('../config/db');

class Sales {

    static async getAll() {
        const result = await pool.query('SELECT * FROM ventas WHERE deleted_at IS NULL');
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM ventas WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { id_orden, metodo_pago, fecha_pago, total_pagado } = data;
        const result = await pool.query(`INSERT INTO ventas (id_orden, metodo_pago, fecha_pago, total_pagado) VALUES ($1, $2, $3, $4) RETURNING *`, [id_orden, metodo_pago, fecha_pago, total_pagado]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { id_orden, metodo_pago, fecha_pago, total_pagado } = data;
        const result = await pool.query(`UPDATE ventas SET id_orden = $1, metodo_pago = $2, fecha_pago = $3, total_pagado = $4, updated_at = NOW() WHERE id = $5 AND deleted_at IS NULL RETURNING *`, [id_orden, metodo_pago, fecha_pago, total_pagado, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(`UPDATE ventas SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING *`, [id]);
        return result.rows[0];
    }

}

module.exports = Sales;
