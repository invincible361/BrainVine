require('dotenv').config();
const { sendEmail } = require('./utils/email');
sendEmail(
  process.env.ADMIN_EMAIL,
  'Test Email from BrainVine Backend',
  'This is a test email from your Node.js backend.'
).then(() => {
  console.log('Test email sent!');
  process.exit(0);
}).catch(err => {
  console.error('Email error:', err);
  process.exit(1);
});