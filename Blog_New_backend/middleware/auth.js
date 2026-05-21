// auth middleware is a function that checks if the user is authenticated before allowing access to certain routes. It can be used to protect routes that require authentication, such as creating a new blog post or editing an existing one.

const jwt = require("jsonwebtoken");
require("dotenv").config();


// extract the token from the request header
// verify the token using the secret key
// thi is authentication middleware to check if the user is authenticated before allowing access to certain routes
exports.authMiddleware = (req, res, next) => {
    /// Get token from header
  const token = req.header("x-auth-token");

  // way to extract token from body or cookies if needed
  // const tokenFromBody = req.body.token || req.cookies.token || "";

  if (!token) {
    // 401 unauthorized status code
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    // to move to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// authorization middleware to check if the user has the required role to access a route
exports.isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ msg: "Access denied. Student only." });
  }
  next();
};

exports.isAdmin = (req,res , next )=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({ msg: "Access denied. Admin only." });
    }
    next();
}