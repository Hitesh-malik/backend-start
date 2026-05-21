const express = require('express');

const app = express();
// to midleware for parsing JSON data in request body
app.use(express.json());

const router = require('./routes/blogRoutes');
app.use('/api/v1/blogs', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//default route
app.get('/', (req, res) => {
    res.send("Welcome to the Blog API");
});
// we did connect the database before starting the server
const connectDB = require('./config/dbConnect');
connectDB();

