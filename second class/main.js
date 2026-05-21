// main file to run the server and connect to the database and set up the routes and middlewares

const express = require('express');
// create instance of express app to set up the server
const app = express();

// to connect the dotenv file to access the environment variables
require("dotenv").config();

//middle ware to parse the json data from the request body
app.use(express.json()); // to parse the json data from the request body

// to run on this port or if there is a port in the environment variable then use that
const PORT = process.env.PORT || 3000;

// import  routes
const todoRoutes = require('./routes/Todos');

//mount the todo routes apis    
app.use('/api/v1', todoRoutes); // -- > localhost:3000/api/v1/create-todo this will be the complete url of the create todo api

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});


// this method is already create in the file to connect to the database and we will call this method to connect to the database before starting the server
const dbConnect = require('./config/database');

// to connect to the database
dbConnect();

// default route to check if the server is running or not
app.get('/', (request, responce)=>{
    responce.send("Welcome to the Todo API");
})