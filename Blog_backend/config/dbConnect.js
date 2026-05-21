const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then((data) => { console.log(`Mongodb connected with server: ${data.connection.host}`) })
        .catch((err) => {
            console.error(`Error connecting to MongoDB: ${err}`);
            process.exit(1);
        });
}

module.exports = connectDB;