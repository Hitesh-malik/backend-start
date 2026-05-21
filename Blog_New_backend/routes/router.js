const { model } = require("mongoose");
const { isAdmin , authMiddleware , isStudent } = require("../middleware/auth");

const router = require("express").Router();

// imnporting the controllers


// map the controllers to the routes


// normal routes
router.get('/admin',authMiddleware ,isAdmin, (req,res)=>{
    return res.json({ msg: "Welcome Admin!" });
})

router.get('/student',authMiddleware ,isStudent, (req,res)=>{
    return res.json({ msg: "Welcome Student!" });
})


module.exports = router;