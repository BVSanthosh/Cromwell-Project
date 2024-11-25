/**
 * /user routes
 */

const express = require('express');
const router = express.Router();   //Get the router for login and signup end-points

const { register, login, user_details } = require('../controllers/authController');  //Import the controllers to handle user authentication requests
const { authenticateToken } = require('../controllers/tokenAuthController');   //Import the JWT authentication middleware

router.post('/register', register);  //Route handler for the signup functionality
router.post('/login', login);  //Route handler for the login functionality
router.get('/', authenticateToken, user_details);  //Route handler for retrieving the user data

module.exports = router; 