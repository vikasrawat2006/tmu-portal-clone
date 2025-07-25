const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://didactic-engine-r46qv69rj67r3p7pv-3000.app.github.dev'
];

// ✅ CORS setup
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// ✅ Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ✅ MongoDB Connection
console.log("🔗 Connecting to Mongo URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ Mongo connection error:", err));

// ✅ Routes
app.use('/api', require('./routes/auth'));

// ✅ Serve login.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
