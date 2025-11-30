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

const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const { name, category, price, batteryLife, displaySize, chip, isInStock } = req.body;

        if (
            !name ||
            !category ||
            price === undefined ||
            batteryLife === undefined ||
            displaySize === undefined ||
            !chip ||
            typeof isInStock !== 'boolean'
        ) {
            return res.status(400).send('Missing or invalid required fields.');
        }

        const validCategories = ['laptop', 'desktop', 'phone', 'tablet'];
        if (!validCategories.includes(category)) {
            return res.status(400).send('Invalid category.');
        }

        const product = new Product({
            name,
            category,
            price,
            batteryLife,
            displaySize,
            chip,
            isInStock
        });

        await product.validate();
        const savedProduct = await product.save();
        res.status(201).send(savedProduct);

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send(err.message);
        }
        res.status(500).send('Error creating product.');
    }
};

// UPDATE
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const { name, category, price, batteryLife, displaySize, chip, isInStock } = req.body;

        if (
            !name ||
            !category ||
            price === undefined ||
            batteryLife === undefined ||
            displaySize === undefined ||
            !chip ||
            typeof isInStock !== 'boolean'
        ) {
            return res.status(400).send('Missing or invalid required fields.');
        }

        const validCategories = ['laptop', 'desktop', 'phone', 'tablet'];
        if (!validCategories.includes(category)) {
            return res.status(400).send('Invalid category.');
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                category,
                price,
                batteryLife,
                displaySize,
                chip,
                isInStock
            },
            { new: true, runValidators: true }
        );

        if (!product) return res.status(404).send('Product not found.');

        res.send(product);

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send(err.message);
        }
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