const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sku: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    description: {
        type: String,
        unique: false,
        required: true
    },
    price: {
        type: Number,
        unique: false,
        required: true
    },
    category: {
        type: String,
        unique: false,
        required: true,
        enum:['Bedroom', 'Bathroom', 'Kitchen', 'Living Room', 'Home Office']
    },
    stock: {
        type: Number,
        unique: false,
        default: 10
    },
    date: {
        type: Date,
        unique: false,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;