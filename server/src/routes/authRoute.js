const express = require('express');
const router = express.Router();   //gets the router for login and signup end-points

const { signup, login, user_details } = require('../controllers/authController');  //imports the controllers to handle user authentication requests
const { authenticateToken } = require('../controllers/tokenAuthController');   //gets the JWT authentication middleware

router.post('/signup', signup);  //route handler for the signup functionality
router.post('/login', login);  //route handler for the login functionality
router.get('/', authenticateToken, user_details);  //route handler for retrieving the user data

module.exports = router;  //exports the route handlers