const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const { connectDB } = require('./src/config/database');  //Import the connection method to the database
const authRouter = require('./src/routes/authRoute');  //Import the authentication routes
const productsRouter = require('./src/routes/productsRoute');  //Import the product routes

dotenv.config();  //Read the environment variables stored in .envs

app.use(cors({    //Enable Cross-Origin Resource Sharing
    origin: 'http://localhost:3000',
    credentials: true,
}));  
app.use(express.json());  //Use a default middleware which parses JSON data from incoming requests
app.use(cookieParser());  //Middleware that makes parsing cookies easier
app.use('/products', express.static(path.join(__dirname, 'src', 'assets', 'images')));   //Serve static files from the 'assets/images' directory

const PORT = process.env.PORT || 5000;  //Port where the server listens for requests

connectDB();  //Connects to the MongoDB database

app.use('/user', authRouter);  //Set up the authentication routes (signup and login)
app.use('/products', productsRouter);  //Set up the products route

const server = app.listen(PORT, () => {  //Initiate the server
    console.log(`server running on port: ${PORT}`);
})

module.exports = { app, server };