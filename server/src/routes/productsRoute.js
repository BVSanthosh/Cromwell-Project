/**
 * /products routes
 */

const express = require('express');
const router = express.Router();   //Get the router for login and signup end-points

const { product_catalogue, product_image } = require('../controllers/productsController');  //Import the controllers to handle user authentication requests
const { authenticateToken } = require('../controllers/tokenAuthController');   //Import the JWT authentication middleware

router.get('/', authenticateToken, product_catalogue);  //Route handler for retrieving the product catalogue
router.get('/:imageName', authenticateToken, product_image);  //Route handler for retrieving the product image

module.exports = router;  