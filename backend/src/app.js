const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

// 1. Inisialisasi Config
dotenv.config();
const app = express();

// 2. Middleware Utama
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' })); 
app.use(express.json()); // Parsing body JSON

// 3. Monitor Koneksi MongoDB (Sangat membantu untuk Debug di Railway)
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose: Koneksi terhubung ke MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose Error: ' + err);
});

// 4. Daftar Endpoints (Disesuaikan dengan rute yang ada)
app.use('/api/skill', require('./routes/skillRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/progress', require('./routes/progressRoutes')); 
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/community', require('./routes/postRoutes')); 

// Health Check API
app.get('/', (req, res) => {
    res.status(200).send('KARYANUSA API is Running Smoothly... 🌿');
});

// 5. Error Handler Middleware (Wajib di urutan paling bawah setelah rute)
app.use(errorHandler);

// 6. Jalankan Server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI tidak ditemukan di file .env');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Berhasil menyambungkan ke MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`🚀 Karyanusa Backend Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Gagal melakukan koneksi awal ke Database:', err.message);
    process.exit(1);
  });