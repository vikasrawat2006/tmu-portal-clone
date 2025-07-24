// backend/models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  enrollment: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
