const Blogs = require('../model/blog');

exports.deleteBlogsById = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedBlog = await Blogs.findByIdAndDelete(id);// array ma wo find out and usse ko delete kardo
        if (!deletedBlog) {
            return res.status(404).json({
                success : false,
                message : "Blog not found",
                data : null
            });
        }
        res.status(200).json({
            success : true,
            message : "Blog deleted successfully",
            data : deletedBlog
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Error deleting blog",
            data : err.message
        });
    }
}