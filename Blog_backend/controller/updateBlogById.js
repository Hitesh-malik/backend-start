const blogs = require('../model/blog');

exports.updateBlogById = async (req, res) => {
    try{
        const id = req.params.id;
        const { title, data } = req.body;
        // new true is used to return the updated document instead of the old one
        const updatedBlog = await blogs.findByIdAndUpdate(id, { title, data , updateDate: Date.now()  }, { new: true });
        
        if (!updatedBlog) {
            return res.status(404).json({
                success : false,
                message : "Blog not found",
                data : null
            });
        }
        res.status(200).json({
            success : true,
            message : "Blog updated successfully",
            data : updatedBlog
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error updating blog",
            data : error.message
        });
    }
}