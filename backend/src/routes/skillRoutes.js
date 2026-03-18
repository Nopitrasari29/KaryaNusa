const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/skillController');
router.post('/analyze', ctrl.analyzeSkill);
router.get('/result/:sessionId', ctrl.getResult);
module.exports = router;