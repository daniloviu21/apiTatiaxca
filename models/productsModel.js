const pool = require('../config/db');

class Products {

  static async getProducts() {
    const result = await pool.query('SELECT * FROM productos');
    return result.rows;
  }

  static async create(data) {
    const {nombre, descripcion, precio, imagen, stock } = data;
    const result = await pool.query(`INSERT INTO productos (nombre, descripcion, precio, imagen, stock)  VALUES ($1, $2, $3, $4, $5) RETURNING *`,[nombre, descripcion, precio, imagen, stock] );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nombre, descripcion, precio, imagen, stock } = data;
    const result = await pool.query(`UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, stock = $5, updated_at = now() WHERE id = $6 AND deleted_at IS NULL RETURNING *`,[nombre, descripcion, precio, imagen, stock, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(`UPDATE productos SET deleted_at = now() WHERE id = $1 AND deleted_at IS NULL RETURNING *`,[id]);
    return result.rows[0];
  }
}

module.exports = Products;
