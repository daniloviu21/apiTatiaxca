const pool = require('../config/db');

class Menu {
    static async getAll() {
        const result = await pool.query('SELECT * FROM menu WHERE deleted_at IS NULL');
        return result.rows;
    }

    static async create(data) {
        const { nombre, descripcion, precio, id_categoria, imagen_url, imagen_public_id } = data;
        const result = await pool.query(`INSERT INTO menu (nombre, descripcion, precio, id_categoria, imagen_url, imagen_public_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,[nombre, descripcion, precio, id_categoria, imagen_url, imagen_public_id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre, descripcion, precio, id_categoria, imagen_url, imagen_public_id } = data;
        const result = await pool.query(`UPDATE menu SET nombre = $1, descripcion = $2, precio = $3, id_categoria = $4, imagen_url = $5, imagen_public_id = $6, updated_at = now() WHERE id = $7 AND deleted_at IS NULL RETURNING *`,[nombre, descripcion, precio, id_categoria, imagen_url, imagen_public_id, id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('UPDATE menu SET deleted_at = now() WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM menu WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows[0];
    }

    static async findWithCategoryById(id) {
        const result = await pool.query(`SELECT m.id, m.nombre, m.descripcion, m.precio, m.imagen_url, c.nombre AS categoria FROM menu m
        INNER JOIN categorias c ON m.id_categoria = c.id WHERE m.id = $1 AND m.deleted_at IS NULL`, [id]);
        return result.rows[0];
    }

}

module.exports = Menu;