const mongoose = requried("mongoose");
const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/first-class")
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    })
}
module.exports = connectDB;