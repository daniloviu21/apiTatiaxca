const OrderDetails = require('../models/orderDetailsModel');
const Orders = require('../models/ordersModel');
const Supplies = require('../models/suppliesModel');
const Ingredients = require('../models/ingredientsModel');

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

            const detalleActualizado = await OrderDetails.updateEstado(id_detalle, estado_preparacion, client);
            if (!detalleActualizado) {
                await client.query('ROLLBACK');
                return res.status(404).json({ message: 'Detalle no encontrado' });
            }

            if (estado_preparacion === 'Preparando') {
                const detalle = await OrderDetails.getDetalleById(id_detalle, client);
                const { id_menu, cantidad, sin_ingredientes, id_orden } = detalle;

                const orden = await Orders.getById(id_orden);
                const esParaLlevar = orden?.para_llevar;

                await Ingredients.descontarPorMenuFiltrado(
                    id_menu,
                    cantidad,
                    sin_ingredientes || [],
                    client
                );

                await Supplies.descontarPorMenu(id_menu, cantidad, client);

                if (esParaLlevar) {
                    await Supplies.descontarDesechablesPorMenu(id_menu, cantidad, client);
                }
            }

            await client.query('COMMIT');
            return res.json(detalleActualizado);
        } catch (e) {
            await client.query('ROLLBACK');
            res.status(500).json({ error: e.message });
        } finally {
            client.release();
        }
    }

}

module.exports = OrderDetailsController;