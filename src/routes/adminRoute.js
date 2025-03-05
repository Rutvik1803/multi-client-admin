const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getClients,
  updatePermissions,
} = require('../controller/adminController');

// Get all clients (Admin Only)
router.get('/clients', protect, authorize('admin'), getClients);

// Update the persmissions array of a client (Admin Only)
router.put(
  '/clients/:id/permissions',
  protect,
  authorize('admin'),
  updatePermissions
);

module.exports = router;
