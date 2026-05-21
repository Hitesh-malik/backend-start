const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL).then(()=>{
        console.log("Connected to the database successfully!");
    }).catch((err)=>{
        console.log("Error connecting to the database:", err);
    })
  }catch(error){
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;