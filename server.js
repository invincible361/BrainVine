const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payment');
const contactRoutes = require('./routes/contact');
require('dotenv').config();

const app = express();
const db = new sqlite3.Database('session_logs.db');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  ip TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.post('/log-session', (req, res) => {
  const name = req.body.name || 'Anonymous';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  db.run('INSERT INTO sessions (name, ip) VALUES (?, ?)', [name, ip], function(err) {
    if (err) return res.status(500).json({error: err.message});
    res.json({success: true, id: this.lastID});
  });
});

// Payment webhook route
app.use('/webhook/payment', paymentRoutes);

// Contact form route
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('BrainVine Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// TODO:
// - Set up .env for Razorpay, email, WhatsApp credentials
// - Implement /routes/payment.js for webhook verification and notifications
// - Add /utils/email.js and /utils/whatsapp.js for notifications
// - (Optional) Add database for payment records 