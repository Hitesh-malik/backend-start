const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// singup 
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone_no, password, age, gender } = req.body;
        //check that mail already exists or not
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        // password hashing
        let hashedPassword;
        try {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing Password',
            });
        }
        //create user using save method
        const user = new User({
            name,
            email,
            phone_no,
            password: hashedPassword,
            age,
            gender
        });
        await user.save();
        //create jwt token and send response in data we send id as id is commonly used in frontend to store in local storage and use for authentication
        const jwtToken = jwt.sign({ userId: user._id , email: user.email , name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log(jwtToken, "this is the token");
        user.password = undefined;// remove password from response as it is not needed in frontend and also for security reasons
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: jwtToken,
            user: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to register user"
        })
    }
}



// login 
exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        //check that mail already exists or not
        const user = await User.findOne({ email });
        //  no data means null or undefined or empty string
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        //create jwt token
        const jwtToken = jwt.sign({ userId: user._id , email: user.email , name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
        user.password = undefined;// remove password from response as it is not needed in frontend and also for security reasons
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: jwtToken,
            user: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to login user"
        })
    }
}