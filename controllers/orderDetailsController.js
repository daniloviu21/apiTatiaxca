const OrderDetails = require('../models/orderDetailsModel');
const Orders = require('../models/ordersModel');

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
        const client = await require('../config/db').connect();
        try {
            const { id_menu, id_orden, cantidad, subtotal, comentario } = req.body;
            await client.query('BEGIN');

            const detalle = await OrderDetails.create({ id_menu, id_orden, cantidad, subtotal, comentario }, client);
            await client.query(`UPDATE ordenes SET id_estatus = 1, updated_at = NOW() WHERE id = $1 AND id_estatus = 2`, [id_orden]);
            await Orders.recalcularTotal(id_orden);

            await client.query('COMMIT');
            res.status(201).json(detalle);
        } catch (e) {
            await client.query('ROLLBACK');
            console.error('Error en OrderDetailsController.create:', e);
            res.status(500).json({ error: e.message });
        } finally {
            client.release();
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
            const detalle = await OrderDetails.delete(req.params.id);
            if (!detalle) return res.status(404).json({ message: 'No encontrado' });
            await Orders.recalcularTotal(detalle.id_orden);

            res.json({ message: 'Eliminado correctamente y total actualizado' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateEstado(req, res) {
        try {
            const { estado_preparacion } = req.body;
            const detalle = await OrderDetails.updateEstado(req.params.id, estado_preparacion);
            if (!detalle) return res.status(404).json({ message: 'Detalle no encontrado' });
            return res.json(detalle);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

}

module.exports = OrderDetailsController;