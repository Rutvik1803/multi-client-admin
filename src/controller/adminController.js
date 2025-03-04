const User = require('../models/User');

// Get all clients (Admin Only)
const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password');
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getClients };
