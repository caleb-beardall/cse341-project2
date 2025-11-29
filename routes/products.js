const router = require('express').Router();
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProduct);

router.post('/', isAuthenticated, productsController.createProduct);

router.put('/:id', isAuthenticated, productsController.updateProduct);

router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;