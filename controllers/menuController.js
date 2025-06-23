const Menu = require('../models/menuModel');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

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
        try {
            const { nombre, descripcion, precio, id_categoria, imagen } = req.body;

            const result = await cloudinary.uploader.upload(imagen, {
                folder: 'menu'
            });

            const data = {
                nombre,
                descripcion,
                precio,
                id_categoria,
                imagen_url: result.secure_url,
                imagen_public_id: result.public_id
            };

            const nuevo = await Menu.create(data);
            res.status(201).json(nuevo);
        } catch (e) {
            res.status(500).json({ error: e.message });
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
}

module.exports = MenuController;