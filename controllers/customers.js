const Customer = require('../models/customer');

// READ
const getAllCustomers = async (req, res) => {
    //#swagger.tags=['Customers']

    try {
        const customers = await Customer.find();
        res.send(customers);
    } catch (err) {
        res.status(500).send('Error retrieving customers.');
    }
};

const getCustomer = async (req, res) => {
    //#swagger.tags=['Customers']

    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found.');
        res.send(customer);
    } catch (err) {
        res.status(500).send('Error retrieving customer.');
    }
};

// CREATE
const createCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    
    try {
        if (
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            typeof req.body.isSubscribed !== 'boolean'
        ) {
            return res.status(400).send('Missing or invalid required fields.');
        }

        let customer = new Customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            isSubscribed: req.body.isSubscribed
        });

        customer = await customer.save();
        res.status(201).send(customer);
    } catch (err) {
        res.status(500).send('Error creating customer.');
    }
};

// UPDATE
const updateCustomer = async (req, res) => {
    //#swagger.tags=['Customers']

    try {
        if (
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            typeof req.body.isSubscribed !== 'boolean'
        ) {
            return res.status(400).send('Missing or invalid required fields.');
        }

        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                isSubscribed: req.body.isSubscribed
            },
            { new: true }
        );

        if (!customer) return res.status(404).send('Customer not found.');

        res.send(customer);
    } catch (err) {
        res.status(500).send('Error updating customer.');
    }
};

// DELETE
const deleteCustomer = async (req, res) => {
    //#swagger.tags=['Customers']

    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).send('Customer not found.');
        res.send(customer);
    } catch (err) {
        res.status(500).send('Error deleting customer.');
    }
};

module.exports = {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};