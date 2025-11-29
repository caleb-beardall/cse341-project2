const router = require('express').Router();
const customersController = require('../controllers/customers');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', customersController.getAllCustomers);

router.get('/:id', customersController.getCustomer);

router.post('/', isAuthenticated, customersController.createCustomer);

router.put('/:id', isAuthenticated, customersController.updateCustomer);

router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;