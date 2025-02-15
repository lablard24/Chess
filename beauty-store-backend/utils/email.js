const nodemailer = require("nodemailer");
require('dotenv').config();


// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("❌ EMAIL_USER and EMAIL_PASS must be set in the environment variables.");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send email notifications
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email body in HTML format
 */
const sendEmail = async (to, subject, html) => {
  const mailOptions = { 
    from: `"Chess Decor" <${process.env.EMAIL_USER}>`, 
    to,
    subject,
    html
   };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.response}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendEmail;
