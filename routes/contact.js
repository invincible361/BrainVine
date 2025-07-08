const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    // Log contact form submission (no email sent)
    console.log('Contact form submission:', { name, email, phone, message });
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

module.exports = router; 