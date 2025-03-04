require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute');
const feedbackRoutes = require('./routes/feedbackRoute');
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.get('/api/health', (req, res) => {
  res
    .status(200)
    .json({ status: 'OK', uptime: process.uptime(), timestamp: Date.now() });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
