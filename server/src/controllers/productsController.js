/**
 * Controllers for the /products routes
 */

const Products = require('../models/productModel')  //Import the products model

exports.product_catalogue = async (req, res) => {
    try {
        const products = await Products.find();

        res.status(200).json({
            success: true,
            message: 'Product catalogue fetched successfully',
            data: products,
        });
    } catch (error) {
        console.error(`Error fetching product catalogue: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product catalogue',
        });
    }
};

exports.product_image = async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'assets', 'images', imageName);

    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
};