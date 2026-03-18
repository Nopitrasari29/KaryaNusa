const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');

// POST: Untuk simpan atau update progres
// Endpoint: /api/progress/update
router.post('/update', userProgressController.updateProgress);

// GET: Untuk ambil data progres berdasarkan session
// Endpoint: /api/progress/:sessionId
router.get('/:sessionId', userProgressController.getProgress);

module.exports = router;