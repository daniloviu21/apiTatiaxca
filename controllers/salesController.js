const Sales = require('../models/salesModel');

class SalesController {

    static async getAll(req, res) {
        try {
            const sales = await Sales.getAll();
            res.json(sales);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async getById(req, res) {
        try {
            const sale = await Sales.getById(req.params.id);
            if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
            res.json(sale);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async create(req, res) {
        try {
            const sale = await Sales.create(req.body);
            res.status(201).json(sale);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async update(req, res) {
        try {
            const sale = await Sales.update(req.params.id, req.body);
            if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
            res.json(sale);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async delete(req, res) {
        try {
            const sale = await Sales.delete(req.params.id);
            if (!sale) return res.status(404).json({ message: 'Venta no encontrada' });
            res.json({ message: 'Venta eliminada correctamente' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = SalesController;