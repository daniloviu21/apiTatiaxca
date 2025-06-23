const DetailOrders = require('../models/detailOrdersModel');

class DetailOrdersController {

    static async getAll(req, res) {
        try {
            const item = await DetailOrders.getAll();
            res.json(item);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getByOrder(req, res) {
        try {
            const item = await DetailOrders.getByOrderId(req.params.id);
            res.json(item);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async create(req, res) {
        try {
            const item = await DetailOrders.create(req.body);
            res.status(201).json(item);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async update(req, res) {
        try {
            const item = await DetailOrders.update(req.params.id, req.body);
            if (!item) return res.status(404).json({ message: 'No encontrado' });
            res.json(item);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async delete(req, res) {
        try {
            const item = await DetailOrders.delete(req.params.id);
            if (!item) return res.status(404).json({ message: 'No encontrado' });
            res.json({ message: 'Eliminado exitosamente' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

module.exports = DetailOrdersController;