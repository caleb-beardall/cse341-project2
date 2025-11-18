const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['laptop', 'desktop', 'phone', 'tablet'],
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

// READ
const getAllProducts = async (req, res) => {
    //#swagger.tags=['Products']
    const products = await Product.find();
    res.send(products);
};

const getProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
};

// CREATE
const createProduct = async (req, res) => {
    //#swagger.tags=['Products']

    // const { error } = validateCustomer(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    
    let product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        isInStock: req.body.isInStock
    });
    product = await product.save();

    res.send(product);
};

// UPDATE
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']

    // const { error } = validateCustomer(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            isInStock: req.body.isInStock
        },
        {
            new: true
        });

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
};

// DELETE
const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
};

// function validateGenre(genre) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });
//     return schema.validate(genre);
// }

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};