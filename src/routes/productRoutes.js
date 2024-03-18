const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Crear un nuevo producto
router.post('/', productsController.createProduct);

// Obtener todos los productos
router.get('/', productsController.getAllProducts);

// Obtener un solo producto por su ID
router.get('/:productId', productsController.getProductById);

// Actualizar un producto por su ID
router.put('/:productId', productsController.updateProduct);

// Eliminar un producto por su ID
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
