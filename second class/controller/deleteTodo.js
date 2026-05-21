// extract the model
const todoModel = require('../model/Todo');

exports.deleteTodo = async (req, res) => {
    try{
        const {id} = req.params; // extract the id from the request params

        // methhod to detlete data from database
        const todo = await todoModel.findByIdAndDelete({_id: id});

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found with this id",
            });
        } 
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: todo
        }); 

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error deleting todo",
            data: error.message
        });
    }
}

