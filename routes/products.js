const router = require('express').Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProduct);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;