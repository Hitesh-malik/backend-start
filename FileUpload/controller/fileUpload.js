const path = require("path");
const cloudinary = require("cloudinary").v2;
exports.localFileUpload = async (req, res) => {
  try {
    // check file exists
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // fetch file
    const file = req.files.file;

    // create unique filename
    const fileName = Date.now() + "-" + `.${file.name.split('.')[-1]}`;

    // path where file will store
    const uploadPath = path.join(__dirname, "../uploads", fileName);

    // move file
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "File upload failed",
        });
      }

      res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        filePath: `/uploads/${fileName}`,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
// for db interaction with the database and store the url
const File = require("../model/File");

//method to find is suuported (true or false)
function isFileTypeSupported(type, supportedType)  {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  // this is consider to be done
  options.resource_type = "auto";// auto determine the type of file 
  // why tempFilePath  (this is the need of the cloudnary in docs its there )
  await cloudinary.uploader.upload(file.tempFilePath, options)
}



exports.imageUpload = async (req, res) => {
  try {
    // fetch the data
    const { name, tags, email } = req;

    // imageFile is the  in which user send the data 
    const file = req.files.imageFile;

    // validation
    const supportedType = ['jpg', 'jpeg', 'png'];
    // current file 
    const filetype = file.name.split('.')[1].toLowerCase();


    if (!isFileTypeSupported(filetype, supportedType)) {
      res.status(400).json({
        success: false,
        message: "this ext is not allowed",
      })
    }
    // file format suuuported hai -- > folder ka name jo clounary pe banaya ha
    const reponce = await uploadFileToCloudinary(file, "codeHelp");

    //print the reponce
    console.log(responce);// yhe aara aha cloudnari se

    // save entry in the db
    const fileData = await File.crete({
      name, tags, email, imageUrl : reponce.secure_url
    })

    res.status(200).json({
      success : true,
      message :  'Image successfully uplaoded'
    })
  } catch (err) {
    console.log("this is the error in image upload to cloud ", err);
    res.status(500).json({
      success: false,
      message: "fail to upload on the cloud",
      error: err
    })
  }
}

exports.videoUpload = async (req , res)=>{
  try{
    const supportedType = ["mp4" , "mov"];
    const file = req.file.vedioFiles;

    const type = file.name.split('.')[1].toLowerCase();
    //check if the file is supported or not
    if(!isFileTypeSupported(type , supportedType)){
      res.status(500).json({
        message : "file is not supported",
        success : false,
      })
    }

    // now when file is supported
    const responce = uploadFileToCloudinary(file ,"codeHelp");

    const fileDat = await File.create({
      name, tags,email , ImageUrl : responce.secure_url
    })

    res.status(200).json({
      message : "file uploaded ",
      success : true,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message : "failed to upload the file",
      error : error,
      success : false,
    })
  }
}