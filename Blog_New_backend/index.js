const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/dataBaseConnect");
const router = require("./routes/router");  


//middle ware for the parsing of the data
app.use(express.json());

// for the versioning of the api and to map the routes
app.use('/api/v1', router);

// on which port the server will run and the connection to the database
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Connect to the database
connectDB();


// what is cooker parser and how to use it in express js

// cookie-parser is a middleware that parses cookies attached to the client request object. It populates the req.cookies object with the cookies sent by the client. This is useful for handling user sessions, authentication, and other features that rely on cookies.