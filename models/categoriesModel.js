const pool = require('../config/db');

class Categories {

    static async getCategories() {
        const result = await pool.query('SELECT * FROM categorias');
        return result.rows;
    }

    static async create(data) {
        const {nombre, descripcion} = data;
        const result = await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *', [nombre, descripcion]);
        return result.rows[0];
    }

    static async update(id, data){
        const {nombre,descripcion} = data;
        const result = await pool.query('UPDATE categorias SET nombre = $1, descripcion = $2, updated_at = now() WHERE id = $3 and deleted_at is null RETURNING *', [nombre, descripcion, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE categorias SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }
    
}

module.exports = Categories;