const express = require("express");
const app = express();

require("dotenv").config();

const connectDB = require("./config/dbConnect");

const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/authRoutes");

const { authMiddleware } = require("./middleware/authMiddleware");

// middleware
app.use(express.json());// for parsing application/json

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
// routes
app.use('/api/v1/auth', authRouter);

app.use('/api/v1', authMiddleware, todoRouter);

// default route
app.get('/', (req, res) => {
    res.send("Welcome to the Todo API");
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

// database + server
connectDB()