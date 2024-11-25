/**
 * Manages accesss to the MongoDB database
 */

const mongoose = require('mongoose');

//Establish a connection with the database using the URL stored in .env
exports.connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch(error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}