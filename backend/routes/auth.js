const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // ✅ model

router.post('/login', async (req, res) => {
  const { enrollment, password } = req.body;

  if (!enrollment || !password) {
    return res.status(400).json({ success: false, reason: "missing" });
  }

  try {
    const user = await Student.findOne({ enrollment: enrollment.toUpperCase() });

    if (!user) {
      return res.status(401).json({ success: false, reason: "unregistered" });
    }

    if (user.password !== password) {
      return res.status(403).json({ success: false, reason: "incorrect" });
    }

   // ✅ SUCCESS: Send minimal student data
    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        enrollment: user.enrollment,
        branch: user.branch,
        semester: user.semester
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, reason: "server" });
  }
});

module.exports = router;
fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ enrollment, password })
})
