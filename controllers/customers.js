const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isSubscribed: {
        type: Boolean,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

// READ
const getAllCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
};

const getCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
};

// CREATE
const createCustomer = async (req, res) => {
    // const { error } = validateCustomer(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isSubscribed: req.body.isSubscribed
    });
    customer = await customer.save();

    res.send(customer);
};

// UPDATE
const updateCustomer = async (req, res) => {
    // const { error } = validateCustomer(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            isSubscribed: req.body.isSubscribed
        },
        {
            new: true
        });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
};

// DELETE
const deleteCustomer = async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
};

// function validateGenre(genre) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });
//     return schema.validate(genre);
// }

module.exports = {
    getAllCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};