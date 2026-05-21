const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            maxLength : 100
        },
        data : {
            type : String,
            required : true
        },
        createDate : {
            type : Date,
            default : Date.now
        },
        updateDate : {
            type : Date,
            default : Date.now
        }
    }
);


module.exports = mongoose.model('Blog', blogSchema);