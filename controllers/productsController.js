const Products = require('../models/productsModel');

class ProductsController {

  static async getAllProducts(req, res) {
    try {
      const products = await Products.getProducts();
      res.json(products);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }


static async createProduct(req, res) {
    try {
      const imageUrl = req.file?.path; 
      const data = { ...req.body,imagen: imageUrl || null
      };
      const product = await Products.create(data);
      res.status(201).json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Products.update(req.params.id, req.body);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' }
      );
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
