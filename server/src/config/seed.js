const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Products = require('../models/productModel');
const { connectDB } = require('./database');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedProducts = async () => {
  try {
    connectDB();

    const productsFilePath = path.join(__dirname, '../assets/products.json');
    const productData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    await Products.deleteMany();
    await Products.insertMany(productData);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedProducts();