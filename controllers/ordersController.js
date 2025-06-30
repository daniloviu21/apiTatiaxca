const Orders = require('../models/ordersModel');

class OrdersController {

    static async getAllOrders(req, res) {
        try {
            const orders = await Orders.getAll();
            res.json(orders);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getOrderById(req, res) {
        try {
            const order = await Orders.getById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "¡Orden no encontrada!" });
            }
            return res.json(order);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async createOrder(req, res) {
        try {
            const order = await Orders.create(req.body);
            res.status(201).json(order);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateOrder(req, res) {
        try {
            const order = await Orders.update(req.params.id, req.body);
            if (!order) {
                return res.status(404).json({ message: "Orden no encontrada!" });
            }
            return res.json(order);
        } catch (e) {
            res.status(500).json({ error: 'Error al actualizar la orden: ' + e.message });
        }
    }

    static async deleteOrder(req, res) {
        try {
            const order = await Orders.delete(req.params.id);
            if (!order) {
                return res.status(404).json({ message: "Orden no encontrada!" });
            }
            return res.json({ message: "Orden eliminada correctamente!" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = OrdersController;