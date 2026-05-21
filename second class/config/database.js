// cofig folder and file database.js is created to connect the database with the project and to make sure that we can use the database connection in any file of the project by just importing this file(database.js) in that file
const mongoose = require('mongoose');

// to connect the .env file to the project then only we can extract the data through process.env
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then((data) => { console.log(`Mongodb connected with server: ${data.connection.host}`) })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err}`);
            // to make sure that server (backend) will not run if there is an error in connecting to the database 
            // connection breakable with database
            process.exit(1);
        });
}



module.exports = connectDB;