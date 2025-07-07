// utils/sendMail.js
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or another SMTP provider
      auth: {
        user: process.env.EMAIL_USER, // from your .env
        pass: process.env.EMAIL_PASS, // from your .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Mail error:", error);
    throw error;
  }
};

module.exports = sendMail;
