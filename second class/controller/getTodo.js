//import the todo model  
const todoModel = require('../model/Todo');

// to get all the todos from the database and send it to the client
exports.getTodo = async (req, res) => {
    try{
        //fetch all the todos from the database
        // find method is used to fetch all the documents from the collection and it returns an array of documents
        // find is mongoes method to fetch all the documents from the collection and it returns a promise so we have to use await to get the result of the promise
        const allTodos = await todoModel.find({});
        // response to the client with the fetched todos
        res.status(200).json({
            success: true,
            data:allTodos,
            message: "Todos fetched successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching todos",
            data : error.message
        });
    }
}

// to send todo based on the id , willl share the details accodigingly
exports.getTodById = async (req, res)=>{
    try{
        // extract todo item todoModel.based on the id from the request params
        const todoid = req.params.id;
        // this findbyid method is used to fetch a single document from the collection based on the id and it returns a promise so we have to use await to get the result of the promise and in baracket we have to pass the id in the form of an object with the key as _id because in the database the id is stored with the key _id
        const todo = await todoModel.findById({_id: todoid});

        // incase id nahi milegi to we will send a response to the client that todo not found
        if(!todo){
            // 404 is the status code for not found and we will send a json response with success as false and message as todo not found with this id
            return res.status(404).json({
                success: false,
                message: "Todo not found with this id",
            });
        }
        // in case we found the data
        return res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${todoid} fetched successfully with this id`
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: `Error fetching todo with this ${todoid} id`,
            data : error.message
        });
    }
}