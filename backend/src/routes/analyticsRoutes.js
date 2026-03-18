const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// URL: /api/analytics/stats
router.get('/stats', analyticsController.getStats);

module.exports = router;