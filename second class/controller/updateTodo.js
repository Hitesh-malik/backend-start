const todoModel = require('../model/Todo');

exports.updateTodo = async (req, res) => {
    try{
        // const todoId = req.params.id;
        const {id} = req.params; // second way to extract the id from the request params
        // extract the title and description from the request body
        const {title , description} = req.body;

        const todo = await todoModel.findByIdAndUpdate(
            { _id : id}, // filter criteria to find the document to update
            { title, description, updatedAt: Date.now() }, // update data
        );

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error updating todo",
            data: error.message
        });
    }
}