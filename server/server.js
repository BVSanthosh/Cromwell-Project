const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const { connectDB } = require('./src/config/database');
const authRouter = require('./src/routes/authRoute');  //imports the authentication routes
const productsRouter = require('./src/routes/productsRoute');  //imports the products route

dotenv.config();  //reads the environment variables stored in .envs

app.use(cors({    //enables Cross-Origin Resource Sharing
    origin: 'http://localhost:3000',
    credentials: true,
}));  
app.use(express.json());  //uses a default middleware which parses JSON data from incoming requests
app.use(cookieParser());  //middleware that makes parsing cookies easier
app.use('/products', express.static(path.join(__dirname, 'src', 'assets', 'images')));   // Serve static files from the 'assets/images' directory

const PORT = process.env.PORT || 5000;  //port where the server listens for requests

connectDB();  //conencts to the MongoDB database

app.use('/user', authRouter);  //sets up the authentication routes (signup and login)
app.use('/products', productsRouter);  //sets up the products route

app.listen(PORT, () => {  //initiates the server
    console.log(`server running on port: ${PORT}`);
})