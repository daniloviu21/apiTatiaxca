const Orders = require('../models/ordersModel');
const OrderDetails = require('../models/orderDetailsModel');

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

    static async createOrderWithDetails(req, res) {
        const client = await pool.connect();
        try {
            const { orden, productos } = req.body;

            console.log('Orden recibida:', orden);
            console.log('Productos recibidos:', productos);

            await client.query('BEGIN');

            const nuevaOrden = await Orders.create(orden, client);

            for (const producto of productos) {
            console.log('Insertando producto:', producto);

            const detalle = {
                id_menu: producto.id,
                id_orden: nuevaOrden.id,
                cantidad: producto.cantidad || 1,
                subtotal: producto.precio * (producto.cantidad || 1),
                comentario: producto.comentario || ''
            };

            await OrderDetails.create(detalle, client);
            }

            await client.query('COMMIT');
            res.status(201).json(nuevaOrden);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error al crear orden con detalles:', error);
            res.status(500).json({ error: error.message });
        } finally {
            client.release();
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