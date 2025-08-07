const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables

const sendEmail = async (recipientEmail, subject, message, isHtml = false) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // Hostinger SMTP or Mailtrap
    port: process.env.EMAIL_PORT,  // 465 (SSL), 587 (TLS), or 2525 (Mailtrap)
    secure: process.env.EMAIL_PORT == 465, // True if using SSL (465)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender
    to: recipientEmail,           // Recipient
    subject: subject,             // Email subject
    [isHtml ? "html" : "text"]: message,  // Sends HTML if isHtml is true, otherwise plaintext
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipientEmail} successfully!`);
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}:`, error);
  }
};

module.exports = sendEmail;
