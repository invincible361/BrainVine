const nodemailer = require('nodemailer');

// Configure transporter (use .env for credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail }; 