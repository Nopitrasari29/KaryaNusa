const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL })); // Izinkan frontend akses
app.use(express.json()); // Supaya bisa baca data JSON

// Import Routes
const skillRoutes = require('./routes/skillRoutes');
const chatRoutes = require('./routes/chatRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Endpoints
app.use('/api/skill', require('./routes/skillRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'))
app.use('/api/progress', require('./routes/progressRoutes')); 
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Health Check
app.get('/', (req, res) => res.send('KARYANUSA API is Running... 🌿'));

// Error Handler Middleware (Wajib di taruh paling bawah setelah routes)
app.use(errorHandler);

// Database & Server Run
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected to Karyanusa Cluster');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });