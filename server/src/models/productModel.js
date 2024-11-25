/**
 * Product Catalogue Model
 */

const mongoose = require('mongoose');

//Schema for storing the product catalogue
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Products = mongoose.model('Products', productsSchema);  //Convert the schema into a model

module.exports = Products; 