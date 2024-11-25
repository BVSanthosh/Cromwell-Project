/**
 * User Model
 */

const mongoose = require('mongoose');

//Schema for storing user credentials
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);  //Convert the schema into a model

module.exports = User; 