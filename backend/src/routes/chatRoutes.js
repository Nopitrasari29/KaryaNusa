const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// URL: /api/chat/send
router.post('/send', chatController.sendMessage);

// URL: /api/chat/history/:sessionId
router.get('/history/:sessionId', chatController.getHistory);

module.exports = router;