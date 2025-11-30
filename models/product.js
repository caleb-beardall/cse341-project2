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
    batteryLife: {
        type: Number,
        min: 0,
        required: true
    },
    displaySize: {
        type: Number,
        min: 0,
        required: true
    },
    chip: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);