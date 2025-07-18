const OrderDetails = require('../models/orderDetailsModel');
const Orders = require('../models/ordersModel');
const Supplies = require('../models/suppliesModel');

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
            const orderDetail = await OrderDetails.create(req.body);
            await Orders.recalcularTotal(req.body.id_orden); 
            res.status(201).json(orderDetail);
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
            const detalle = await OrderDetails.delete(req.params.id);
            if (!detalle) return res.status(404).json({ message: 'No encontrado' });
            await Orders.recalcularTotal(detalle.id_orden);

            res.json({ message: 'Eliminado correctamente y total actualizado' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async updateEstado(req, res) {
        const client = await require('../config/db').connect();
        try {
            const { estado_preparacion } = req.body;
            const id_detalle = req.params.id;

            await client.query('BEGIN');

            const detalle = await OrderDetails.updateEstado(id_detalle, estado_preparacion, client);

            if (!detalle) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: 'Detalle no encontrado' });
            }

            if (estado_preparacion === 'Preparando') {
            const detalleCompleto = await OrderDetails.findById(id_detalle, client);

            if (!detalleCompleto) {
                await client.query('ROLLBACK');
                return res.status(404).json({ message: 'Detalle no encontrado' });
            }

            const { id_menu, cantidad } = detalleCompleto;

            await Supplies.descontarPorMenu(id_menu, cantidad, client);
            }

            await client.query('COMMIT');
            return res.json(detalle);
        } catch (e) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: e.message });
        } finally {
            client.release();
        }
    }

}

module.exports = OrderDetailsController;