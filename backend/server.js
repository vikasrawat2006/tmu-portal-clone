const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });  // <-- THIS LINE

const app = express();
app.use(cors());
app.use(express.json());

console.log("🔗 Connecting to Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ Mongo connection error:", err));

app.use('/api', require('./routes/auth'));

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

const path = require('path');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for root "/" => show login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});
