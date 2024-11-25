/**
 * Controllers for the /user routes
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel')  //Import the user model

//Signup controller which contains the logic for handling signup requests and saves the user signup details as a document in the User model
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username|| !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing user credentials'
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User registration successful',
            data: {
                username: newUser.username
            }
        });

    } catch(error) {
        console.error(`Error creating new user: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while signing up'
        });
    }
}

//Login controller which contains the logic for handling login requests
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Missing user credentials'
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser){
            return res.status(401).json({
                success: false,
                message: 'Invalid usernamd or password'
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        const payload = {
            id: existingUser._id,               
            username: existingUser.username,
            email: existingUser.email
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 3600000
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                username: existingUser.username,
                email: existingUser.email
            }
        });

    } catch(error) {
        console.error(`Error creating new user: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while logging in'
        });
    }
}

//Controller which contains the logic for sending user data
exports.user_details = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ 
                success: true,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User data found',
            data: {
                username: user.username,
                email: user.email
            }
        });
      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user data'
        });
      }
}
