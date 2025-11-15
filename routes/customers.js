const router = require('express').Router();
const customersController = require('../controllers/customers');

router.get('/', customersController.getAllCustomers);

router.get('/:id', customersController.getCustomer);

router.post('/', customersController.createCustomer);

router.put('/:id', customersController.updateCustomer);

router.delete('/:id', customersController.deleteCustomer);

module.exports = router;