const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const FROM = process.env.TWILIO_WHATSAPP_FROM; // e.g., 'whatsapp:+14155238886'

async function sendWhatsApp(to, message) {
  return client.messages.create({
    from: FROM,
    to: 'whatsapp:' + to,
    body: message
  });
}

module.exports = { sendWhatsApp }; 