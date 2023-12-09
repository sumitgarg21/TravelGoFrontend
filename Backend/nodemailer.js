const nodemailer = require("nodemailer");
require("dotenv").config({ path: __dirname + '/.env' });
const pass = process.env.PASS
module.exports.sendMail = async function sendMail(str, data) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'gargaj3456@gmail.com', // generated ethereal user
            pass: pass// generated ethereal password
        }
    })
    var Osubject, Ohtml;
    if (str == "otp") {
        Osubject = `Hello User`
        Ohtml = `
    <h1>Welcome to TravelGo,</h1>
    <br>
    Your OTP to verify email address is given below.
    <br>
    <h1>${data.Otp}</h1>`
    }
    else {
        Osubject = "Reset Password"
        Ohtml = `
    <h1>Link to reset your password</h1>
    <br>
    ${data.resetpassword}`
    }
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"TravelGo" <gargaj3456@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        html: Ohtml // html body
    })
}
