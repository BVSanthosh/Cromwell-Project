const express = require('express');
const router = express.Router();   //gets the router for login and signup end-points

const { product_catalogue, product_image } = require('../controllers/productsController');  //imports the controllers to handle user authentication requests
const { authenticateToken } = require('../controllers/tokenAuthController');   //gets the JWT authentication middleware

router.get('/', authenticateToken, product_catalogue);  //route handler for retrieving the product catalogue
router.get('/:imageName', authenticateToken, product_image);  //route handler for retrieving the product image

module.exports = router;  //exports the route handler