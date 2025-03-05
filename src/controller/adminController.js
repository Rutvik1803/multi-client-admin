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

// Update the persmissions array of a client (Admin Only)
const updatePermissions = async (req, res) => {
  try {
    const { permissions } = req.body;
    const client = await User.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.permissions = permissions;
    await client.save();

    res.status(200).json({ message: 'Permissions updated successfully ' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getClients, updatePermissions };
