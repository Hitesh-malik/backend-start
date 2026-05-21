const Blog = require('../model/blog');

exports.getBlogs = async (req , res)=>{
    try{
        const blogs = await Blog.find({});
        res.status(200).json({
            success : true,
            message : "Blogs fetched successfully",
            data : blogs
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Error fetching blogs",
            data : err.message
        });
    }
}