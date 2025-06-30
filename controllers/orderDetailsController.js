const OrderDetails = require('../models/orderDetailsModel');

class OrderDetailsController {

    static async getAll(req, res) {
        try {
            const order = await OrderDetails.getAll();
            res.json(order);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getByOrder(req, res) {
        try {
            const order = await OrderDetails.getByOrderId(req.params.id);
            res.json(order);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async create(req, res) {
        try {
            const order = await OrderDetails.create(req.body);
            res.status(201).json(order);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async update(req, res) {
        try {
            const order = await OrderDetails.update(req.params.id, req.body);
            if (!order) return res.status(404).json({ message: 'No encontrado' });
            res.json(order);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async delete(req, res) {
        try {
            const order = await OrderDetails.delete(req.params.id);
            if (!order) return res.status(404).json({ message: 'No encontrado' });
            res.json({ message: 'Eliminado correctamente' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = OrderDetailsController;