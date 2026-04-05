import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";


export async function signup(req, res) {
    
    try {
        const { username, email, password, image } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({succes: false, message : 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ succes: false, message : 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.status(400).json({ succes: false, message : 'Password must be at least 8 characters long'})
        }

        const existingUserByEmail = await User.findOne({email: email})

        if (existingUserByEmail) {
            return res.status(400).json({ succes: false, message : 'Email already in use'});
        }

        const existingUserByUsername = await User.findOne({username: username})

        if (existingUserByUsername) {
            return res.status(400).json({ succes: false, message : 'Username already exists'});
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);



        const newUser = new User({
            username: username,
            email: email, 
            password: hashedPassword,
            image: image
        })

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
        sucess: true,
        message: "User created successfully",
        user: {
            ...newUser._doc,
            password: "********",
        },
        });

    } catch (error) {
        console.error('Error during signup: ', error.message);
        res.status(500).json({
            success: false,
            message : 'Internal server error',
            });
    }
}

export async function lognin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email});
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials'});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true, 
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: "********",
            }
        })
    } catch (error) {
        console.error('Error during login controller: ', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ success: true, message: 'Logged out successfully' }); 
    } catch (error) {
        console.error('Error during logout: ', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}