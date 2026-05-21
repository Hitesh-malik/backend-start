const express = require('express');
const connectDB = require('./config/dbConnect');
const router = require('./routes/router');
const uploadRouter = require('./routes/FileUpload');
const app = express();

app.use(express.json());
const fileupload = require('express-fileupload');
// options for fileupload middleware useTempFiles: true, tempFileDir: '/tmp/'
// usetempfiles true means that the uploaded files will be stored in a temporary location on the server's filesystem instead of being kept in memory. This is particularly useful for handling large file uploads, as it prevents the server from consuming too much memory. The tempFileDir option specifies the directory where these temporary files will be stored. In this case, the temporary files will be stored in the '/tmp/' directory. This allows the server to manage file uploads more efficiently and can help improve performance when dealing with large files.
// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/'
// }));
app.use(fileupload());


app.use('/api/v1', uploadRouter);
app.use('/api/v1', router);





app.get('/',(req, res)=>{
    return res.json({message: "Hello, World!"});
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


//connect db
connectDB();


//conect cloudinary
const { cloudinaryConnect } = require('./config/cloudinary');
cloudinaryConnect();