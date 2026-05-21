const Blog = require('../model/blog');

exports.getBlogById = async (req, res) => {
    try{
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success : false,
                message : "Blog not found",
                data : null
            });
        }
        res.status(200).json({
            success : true,
            message : "Blog fetched successfully",
            data : blog
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