// this file will contain the schema of the todo collection in the database and also the model of the todo collection in the database
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title :{
            type : String,
            required : true,
            MaxLength : 100
        },
        description : {
            type : String,
            required : true,
            MaxLength : 500
        },
        createdAt : {
            type : Date,
            required : true,
            default : Date.now()
        },
        updatedAt : {
            type : Date,
            required : true,
            default : Date.now()
        }
    }
)
// any file which will import this file will get the model of todo and then we can perform all the crud operations on the todo collection in the database through this model
module.exports = mongoose.model('Todo', todoSchema);

const userschema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            maxlength : 20,
        },
        userEmail: {
            type : String,
            required : [true, 'Email is required'],// to make sure that email is required and also to provide a custom error message if email is not provided
            maxlength : 100,
            unique : true,// to ensure that there will be no duplicate email in the database and also to make sure that we can use the email as a unique identifier for the user in the database
        },
        password : {
            type : String,
            required : true,
            maxlength : 10,
        }
    }
);

// module.exports = mongoose.model('User', userschema);