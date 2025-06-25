const Menu = require('../models/menuModel');
const MenuIngredients = require('../models/menuIngredientsModel');
const MenuSupplies = require('../models/menuSuppliesModel');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const pool = require('../config/db');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

class MenuController {
    static async getAll(req, res) {
        try {
            const items = await Menu.getAll();
            res.json(items);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async create(req, res) {
        const client = await pool.connect();
        try {
            const {
                nombre,
                descripcion,
                precio,
                id_categoria,
                imagen,
                ingredientes,
                insumos
            } = req.body;

            await client.query('BEGIN');

            const result = await cloudinary.uploader.upload(imagen, {
                folder: 'menu'
            });

            const menuResult = await client.query(
                `INSERT INTO menu (nombre, descripcion, precio, id_categoria, imagen_url, imagen_public_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [nombre, descripcion, precio, id_categoria, result.secure_url, result.public_id]
            );

            const nuevoMenu = menuResult.rows[0];

            if (ingredientes && Array.isArray(ingredientes)) {
                for (const ing of ingredientes) {
                    await MenuIngredients.create({
                    id_menu: nuevoMenu.id,
                    id_ingrediente: ing.id_ingrediente,
                    cantidad: ing.cantidad
                }, client);
                }
            }

            if (insumos && Array.isArray(insumos)) {
                for (const ins of insumos) {
                    await MenuSupplies.create({
                    id_menu: nuevoMenu.id,
                    id_insumo: ins.id_insumo,
                    cantidad: ins.cantidad
                }, client);
                }
            }

            await client.query('COMMIT');
            res.status(201).json(nuevoMenu);

        } catch (e) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: e.message });
        } finally {
            client.release();
        }
    }

    static async update(req, res) {
        try {
            const id = req.params.id;
            const existente = await Menu.findById(id);
            if (!existente) return res.status(404).json({ message: "Producto no encontrado" });

            let { nombre, descripcion, precio, id_categoria, imagen } = req.body;
            let imagen_url = existente.imagen_url;
            let imagen_public_id = existente.imagen_public_id;

            if (imagen) {
                await cloudinary.uploader.destroy(imagen_public_id);
                const result = await cloudinary.uploader.upload(imagen, { folder: 'menu' });
                imagen_url = result.secure_url;
                imagen_public_id = result.public_id;
            }

            const actualizado = await Menu.update(id, {
                nombre,
                descripcion,
                precio,
                id_categoria,
                imagen_url,
                imagen_public_id
            });

            res.json(actualizado);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            const existente = await Menu.findById(id);
            if (!existente) return res.status(404).json({ message: "Producto no encontrado" });

            await cloudinary.uploader.destroy(existente.imagen_public_id);
            await Menu.delete(id);
            res.json({ message: "Producto eliminado" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getDetails(req, res) {
        try {
            const id = req.params.id;

            const menu = await Menu.findWithCategoryById(id);
            if (!menu) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            const ingredientes = await MenuIngredients.getByMenuIdWithNames(id);
            const insumos = await MenuSupplies.getByMenuIdWithNames(id);

            res.json({
                id: menu.id,
                nombre: menu.nombre,
                descripcion: menu.descripcion,
                precio: menu.precio,
                imagen_url: menu.imagen_url,
                categoria: menu.categoria,
                ingredientes,
                insumos
            });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = MenuController;