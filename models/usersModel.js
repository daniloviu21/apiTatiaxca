const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Users {

    static async getUsers() {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
    }

    static async create(data) {
        const { correo, password, id_rol } = data;
        const result = await pool.query('INSERT INTO usuarios (correo, password, id_rol) VALUES ($1, PGP_SYM_ENCRYPT($2::text, $3::text), $4) RETURNING *',[correo, password, 'AES_KEY', id_rol]);
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1',[id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { correo, password, id_rol } = data;
        const result = await pool.query(`UPDATE usuarios SET correo = $1,password = PGP_SYM_ENCRYPT($2, 'AES_KEY'), id_rol = $3, updated_at = now() WHERE id = $4 AND deleted_at IS NULL RETURNING *`,[correo, password, id_rol, id]);
        return result.rows[0];
    }

    static async delete(id){
        const result = await pool.query('UPDATE usuarios SET deleted_at = now() WHERE id = $1 and deleted_at is null RETURNING *', [id]);
        return result.rows[0];
    }

    static async findByCredentials(correo, password) {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND PGP_SYM_DECRYPT(password::bytea, $2::text) = $3',[correo, 'AES_KEY', password]);
        return result.rows[0];
    }

    static async generateAuthToken(correo) {
        const token = jwt.sign({ id: correo.id, correo: correo.correo, idRol: correo.id_rol },process.env.JWT_SECRET,{ expiresIn: '24h' });
        return token;
    }

}

module.exports = Users;