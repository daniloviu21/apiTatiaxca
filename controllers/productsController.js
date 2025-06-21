const Products = require('../models/productsModel');

class ProductsController {

  static async getAllProducts(req, res) {
    try {
      const product = await Products.getAllProducts();
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const product = await Products.create(req.body);
      res.status(201).json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Products.update(req.params.id, req.body);
      if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await Products.delete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = ProductsController;
