const MenuSupplies = require('../models/menuSuppliesModel');

class MenuSuppliesController {

    static async getAll(req, res) {
        try {
            const data = await MenuSupplies.getAll();
            res.json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getByMenu(req, res) {
        try {
            const data = await MenuSupplies.getByMenuId(req.params.id);
            res.json(data);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async create(req, res) {
        try {
            const item = await MenuSupplies.create(req.body);
            res.status(201).json(item);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async update(req, res) {
        try {
            const item = await MenuSupplies.update(req.params.id, req.body);
            if (!item) return res.status(404).json({ message: 'No encontrado' });
            res.json(item);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async delete(req, res) {
        try {
            const item = await MenuSupplies.delete(req.params.id);
            if (!item) return res.status(404).json({ message: 'No encontrado' });
            res.json({ message: 'Eliminado correctamente' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = MenuSuppliesController;