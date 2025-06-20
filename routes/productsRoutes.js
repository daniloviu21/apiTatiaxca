const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsController');
const upload = require('../middlewares/upload'); 

router.get('/products', ProductsController.getAllProducts);
router.post('/products', upload.single('imagen'), ProductsController.createProduct);
router.put('/products/:id', ProductsController.updateProduct);
router.delete('/products/:id', ProductsController.deleteProduct);

module.exports = router;
