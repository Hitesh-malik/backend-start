const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
    try {

        const bearerToken = req.header("Authorization");

        if (!bearerToken) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // Extract actual token
        const token = bearerToken.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "this is the decoded data from token");
        // Save decoded data in request
        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Token invalid",
        });
    }
};