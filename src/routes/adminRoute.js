const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all clients (Admin Only)
router.get('/clients', protect, authorize('admin'), async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password');
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
