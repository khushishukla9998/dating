const nodemailer = require("nodemailer");
const config = require("../../../config/dev.json");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_SENDER,
    pass: config.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email:String, emailOtp:Number) => {

  await transporter.sendMail({
    from: config.EMAIL_SENDER,
    to: email,
    subject: "Email Verification",
   html: `<h2> Your otp is :${emailOtp}</h2>`
    
   
  });
};


export default sendVerificationEmail;