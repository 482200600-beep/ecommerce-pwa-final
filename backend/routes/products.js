// backend/routes/products.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedProducts
} = require('../controllers/productController');

// GET /api/products - Obtener todos los productos
router.get('/', getProducts);

// GET /api/products/featured - Productos destacados
router.get('/featured', getFeaturedProducts);

// GET /api/products/:id - Obtener producto por ID
router.get('/:id', getProductById);

module.exports = router;
