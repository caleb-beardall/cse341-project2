const Product = require('../models/product');

// READ
const getAllProducts = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.status(500).send('Error retrieving products.');
    }
};

const getProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).send('Product not found.');

        res.send(product);
    } catch (err) {
        res.status(500).send('Error retrieving product.');
    }
};

// CREATE
const createProduct = async (req, res) => {
    //#swagger.tags=['Products']

    try {
        if (
            !req.body.name ||
            !req.body.category ||
            req.body.price === undefined ||
            typeof req.body.isInStock !== 'boolean'
        ) {
            return res.status(400).send('Missing or invalid required fields.');
        }

        const validCategories = ['laptop', 'desktop', 'phone', 'tablet'];
        if (!validCategories.includes(req.body.category)) {
            return res.status(400).send('Invalid category.');
        }

        if (typeof req.body.price !== 'number' || req.body.price < 0) {
            return res.status(400).send('Price must be a number >= 0.');
        }

        let product = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            isInStock: req.body.isInStock
        });

        product = await product.save();
        res.status(201).send(product);

    } catch (err) {
        res.status(500).send('Error creating product.');
    }
};

// UPDATE
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']

    try {
        if (
            !req.body.name ||
            !req.body.category ||
            req.body.price === undefined ||
            typeof req.body.isInStock !== 'boolean'
        ) {
            return res.status(400).send('Missing or invalid required fields.');
        }

        const validCategories = ['laptop', 'desktop', 'phone', 'tablet'];
        if (!validCategories.includes(req.body.category)) {
            return res.status(400).send('Invalid category.');
        }

        if (typeof req.body.price !== 'number' || req.body.price < 0) {
            return res.status(400).send('Price must be a number >= 0.');
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                isInStock: req.body.isInStock
            },
            { new: true }
        );

        if (!product)
            return res.status(404).send('Product not found.');

        res.send(product);

    } catch (err) {
        res.status(500).send('Error updating product.');
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product)
            return res.status(404).send('Product not found.');

        res.send(product);
    } catch (err) {
        res.status(500).send('Error deleting product.');
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};