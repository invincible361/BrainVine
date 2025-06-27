const express = require('express');
const router = express.Router();
// const { sendEmail } = require('../utils/email');
// const { sendWhatsApp } = require('../utils/whatsapp');
// const crypto = require('crypto');

// Razorpay webhook endpoint
router.post('/', async (req, res) => {
  // TODO: Verify Razorpay signature for security
  // const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  // const signature = req.headers['x-razorpay-signature'];
  // const body = JSON.stringify(req.body);
  // const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');
  // if (signature !== expectedSignature) return res.status(400).send('Invalid signature');

  // Extract payment and user info
  const event = req.body.event;
  if (event === 'payment.captured') {
    const payment = req.body.payload.payment.entity;
    const name = payment.notes.name || '';
    const email = payment.email || '';
    const phone = payment.contact || '';
    const place = payment.notes.place || '';
    const course = payment.notes.course || '';
    const amount = payment.amount / 100;
    // TODO: Store payment in DB if needed
    // Send notifications
    // await sendEmail(email, ...);
    // await sendWhatsApp(phone, ...);
    // await sendEmail(process.env.ADMIN_EMAIL, ...);
    // await sendWhatsApp(process.env.ADMIN_WHATSAPP, ...);
    console.log('Payment received:', { name, email, phone, place, course, amount });
  }
  res.status(200).json({ status: 'ok' });
});

module.exports = router; 