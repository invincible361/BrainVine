const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/email');

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  // Compose notification
  const subject = 'New Contact Form Submission';
  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
  try {
    // Send email to admin
    await sendEmail(process.env.ADMIN_EMAIL, subject, text);
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Contact notification error:', err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

module.exports = router; 