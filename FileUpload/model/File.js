const monogoose = require('mongoose');
const nodemailer = require('nodemailer')

const fileSchema = new monogoose.Schema({
    name: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
    },
    tag: {
        type: String,
    },
    email: {
        type: String,
    }
})

// post middle ware  invoke when on this scheme we use save method

fileSchema.post("save", async function (docs) {
    try {
        console.log(docs, "what we get in docs");// jo bhi entry create hui ha db ma that is called the docs in this post middlware method
        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.example.com",// KIS KI MAIL SERVICE USE KARNE WALE HO , HERE WE USE GOOGLE MAIL SERVICE (gmail server)
            port: 587,
            secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.SMTP_USER,// this is the mail like abc@gmail.com
                pass: process.env.SMTP_PASS,// how we create this pasword
                // steps open gmail -> manage account - > security -> 2 step verification -> if on then scroll to bottom and we get app password -> dropdown then other -> thne insert the name and generate the password (known as APP password)
            },
        });
        
        const info = await transporter.sendMail({
            from: '"Example Team" <team@example.com>', // sender address
            to: "alice@example.com, bob@example.com", // list of recipients
            subject: "Hello", // subject line
            html: "<b>Hello world?</b>", // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {

    }
})

const File = monogoose.model('file', fileSchema);
module.exports = File;

// for huzan smpt , aws ki (sqs , sns service read this two)

