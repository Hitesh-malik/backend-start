// business logic for creating a todo  or main logic (line of code to do tasks)


const createTodo = require('../model/Todo');

//aync so it wont block the main thread and it will run in the background and it will return a promise
exports.createTodo = async (request , responce)=>{
    try{
        // exttract the data from request body
        const { title, description } = request.body;
        console.log(title, description);
        // create a new todo and insert in DB
        const responceFromDB = await createTodo.create({title,description});

        //send the reponse to the client
        responce.status(200).json({message: "Todo created successfully", data: responceFromDB ,success: true});


    }catch(error){
        console.log(error);
        // send the error response to the client in case of failure
        responce.status(500).json({message: "Error creating todo", success: false , data : error.message});
    }
}
