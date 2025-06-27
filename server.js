const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('session_logs.db');

app.use(cors());
app.use(express.json());

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

app.listen(3000, () => console.log('Server running on port 3000')); 