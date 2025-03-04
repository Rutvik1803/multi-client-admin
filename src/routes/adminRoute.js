const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getClients } = require('../controller/adminController');

// Get all clients (Admin Only)
router.get('/clients', protect, authorize('admin'), getClients);

module.exports = router;
