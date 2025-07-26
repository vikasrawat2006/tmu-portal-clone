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
  'https://didactic-engine-r46qv69rj67r3p7pv-3000.app.github.dev',
  'http://192.168.43.104:3000' 
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

// ✅ Get the local IP address

const os = require('os');

// ✅ 1. Defining function to get local network IP

function getLocalNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (let ifaceName in interfaces) {
    for (let iface of interfaces[ifaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// ✅ 2. Call the function and store IP in a variable

const localIP = getLocalNetworkIP();

// ✅ 3. Use the variable in app.listen

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 to use server click applicable link bellow :');
  console.log(`   → for Local device /this particular device : http://localhost:${PORT}`);
  console.log(`   → for devices conneted  with  same Network : http://${localIP}:${PORT}`);
});

