// backend/seed.js

require('dotenv').config({ path: './backend/.env' }); // make sure this runs FIRST
const mongoose = require('mongoose');
const Student = require('./models/Student'); // Adjust path if needed

const MONGO_URI = process.env.MONGO_URI;

console.log("🔍 MONGO_URI is:", MONGO_URI); // Debug log

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

const demoStudents = [
  { enrollment: "TMU001", password: "pass123" },
  { enrollment: "TMU002", password: "pass456" },
  { enrollment: "TMU003", password: "pass789" },
  // Add more as needed
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    await Student.deleteMany({});
    await Student.insertMany(demoStudents);
    console.log("✅ Demo students inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seedDB();
