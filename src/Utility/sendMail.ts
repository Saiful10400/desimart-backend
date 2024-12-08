import config from "../config";
import nodemailer from "nodemailer"
const sendMail = async(message: string, email: string) => {

    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        service:"gmail",
        auth:{
            user:config.sender_email,
            pass:config.sender_email_password
        }
    })



  const messageConfig = {
    from: config.sender_email,
    to: email,
    subject: "Reset your passwrod",
    text: "Cange your password by clicking the button.",
    html: `
    <p>Click the button below to reset your password:</p>
    <a href="${message}" 
       style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
      Reset Password
    </a>
    <p>If you didn’t request a password reset, you can safely ignore this email.</p>
  `,
  };


  const info=await transporter.sendMail(messageConfig)
  return{
    status:true,
    res:info
  }


};

export default sendMail;
