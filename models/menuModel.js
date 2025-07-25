const pool = require('../config/db');

class Menu {

    static async getAll() {
        const query = `
            SELECT 
                m.id, 
                m.nombre, 
                m.descripcion, 
                m.precio, 
                m.id_categoria, 
                m.imagen_url AS imagen, 
                c.nombre AS categoria,

                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', ing.id, 
                    'nombre', ing.nombre, 
                    'cantidad', mi.cantidad,
                    'unidad', ing.unidad  
                )) FILTER (WHERE mi.id_ingrediente IS NOT NULL), '[]') AS ingredientes,

                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', ins.id, 
                    'nombre', ins.nombre, 
                    'cantidad', ms.cantidad,
                    'unidad', ins.unidad  
                )) FILTER (WHERE ms.id_insumo IS NOT NULL), '[]') AS insumos

            FROM menu m 
            JOIN categorias c ON m.id_categoria = c.id
            LEFT JOIN menu_ingredientes mi ON m.id = mi.id_menu
            LEFT JOIN ingredientes ing ON mi.id_ingrediente = ing.id
            LEFT JOIN menu_insumos ms ON m.id = ms.id_menu
            LEFT JOIN insumos ins ON ms.id_insumo = ins.id
            WHERE m.deleted_at IS NULL 
            GROUP BY m.id, c.nombre 
            ORDER BY m.nombre;
        `;

        const result = await pool.query(query);
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
        const query = `
            SELECT 
                m.id,
                m.nombre,
                m.descripcion,
                m.precio,
                m.id_categoria,
                m.imagen_url,
                c.nombre AS categoria,
                COALESCE((
                    SELECT json_agg(jsonb_build_object(
                        'id', ing.id,
                        'nombre', ing.nombre,
                        'cantidad', mi.cantidad
                    ))
                    FROM menu_ingredientes mi
                    JOIN ingredientes ing ON mi.id_ingrediente = ing.id
                    WHERE mi.id_menu = m.id
                ), '[]') AS ingredientes,
                COALESCE((
                    SELECT json_agg(jsonb_build_object(
                        'id', ins.id,
                        'nombre', ins.nombre,
                        'cantidad', ms.cantidad
                    ))
                    FROM menu_insumos ms
                    JOIN insumos ins ON ms.id_insumo = ins.id
                    WHERE ms.id_menu = m.id
                ), '[]') AS insumos
            FROM menu m
            JOIN categorias c ON m.id_categoria = c.id
            WHERE m.deleted_at IS NULL AND m.id = $1
            GROUP BY m.id, c.nombre
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getGroupedByCategory() {
        const result = await pool.query(`
            SELECT 
                c.id AS categoria_id,
                c.nombre AS categoria_nombre,
                m.id AS producto_id,
                m.nombre AS producto_nombre,
                m.descripcion,
                m.precio,
                m.imagen_url,

                -- Disponible solo si ningún insumo/ingrediente tiene stock <= 0 o está eliminado
                NOT EXISTS (
                    SELECT 1
                    FROM menu_ingredientes mi
                    JOIN ingredientes i ON mi.id_ingrediente = i.id
                    WHERE mi.id_menu = m.id AND (i.stock <= 0 OR i.deleted_at IS NOT NULL)
                ) 
                AND NOT EXISTS (
                    SELECT 1
                    FROM menu_insumos ms
                    JOIN insumos s ON ms.id_insumo = s.id
                    WHERE ms.id_menu = m.id AND (s.stock <= 0 OR s.deleted_at IS NOT NULL)
                ) AS disponible

            FROM menu m
            INNER JOIN categorias c ON m.id_categoria = c.id
            WHERE m.deleted_at IS NULL AND c.deleted_at IS NULL
            ORDER BY c.id, m.id
        `);

        const agrupado = [];

        for (const row of result.rows) {
            let categoria = agrupado.find(c => c.id === row.categoria_id);
            if (!categoria) {
                categoria = {
                    id: row.categoria_id,
                    nombre: row.categoria_nombre,
                    productos: []
                };
                agrupado.push(categoria);
            }

            categoria.productos.push({
                id: row.producto_id,
                nombre: row.producto_nombre,
                descripcion: row.descripcion,
                precio: row.precio,
                imagen: row.imagen_url,
                disponible: row.disponible
            });
        }

        return agrupado;
    }

}

module.exports = Menu;