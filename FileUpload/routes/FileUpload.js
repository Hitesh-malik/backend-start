const express = require('express');
const uploadRouter = express.Router();
// import the controller
const {localFileUpload} = require('../controllers/FileUploadController');

// map the router to the controller functions
uploadRouter.post('/localFileUpload', localFileUpload);
//upload the img to cloudnary
uploadRouter.post('/imageUpload',localFileUpload)

module.exports = uploadRouter;
