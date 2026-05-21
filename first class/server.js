// create folder
// npm init -y ( get the package.json file)
// npm install express
// create server.js
const express = require('express')
// get the instance
const app = express()


// body parser middleware express.json() -- >this is used to parse the incoming request body in JSON format and make it available in the req.body property of the request object. It allows you to easily access and work with the data sent by the client in the request body, such as form data or JSON payloads. By using express.json(), you can handle and process incoming data in a structured way within your Express application.
app.use(express.json())

// my app it means my  backend will work on port 3000
app.listen(3000 ,()=>{
    console.log("server is running ")
})


/// for home page we did this -- > default route 
app.get('/',(req,responce)=>{
    responce.send("Hello World")
})

app.post('/api/cars',(request,response)=>{
    const {name , brand , price} = request.body
    response.send({
        status: 200,// api successfully created the data
        data : { name , brand , price}, // this is the information 
        message : "car create successfully" // this is the message for the user
    });
})

// connect mongo db with express js
const mongoose = require('mongoose')
// url and config for mongo db ( config is imp and have for right now)
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(()=>{
    console.log("connected to mongo db")
}   )
.catch((error)=>{
    console.log("error connecting to mongo db",error)
})  