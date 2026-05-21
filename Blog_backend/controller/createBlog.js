const blog = require('../model/blog');

exports.createBlog = async (req, res) => { 
    try{
        const { title, data } = req.body;
        const newBlog = await blog.create({ title, data });
        res.status(201).json({
            success : true,
            message : "Blog created successfully",
            data : newBlog
        }); 
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Error creating blog",
            data : error.message
        });
    }
}