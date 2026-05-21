const express = require('express');

app.use(express.json());

const app = express();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// app.use("/api/v1", router);

const connectDB = require('./database');

connectDB();

//default router
app.get("/", (req, res) => {
    res.send("Hello, World!");
});