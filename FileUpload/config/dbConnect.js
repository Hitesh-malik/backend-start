const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err.message);
            process.exit(1);
        });
};

module.exports = connectDB;

