const mongoose = require('mongoose');

const skillResultSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  answers: [Number],
  skillResult: String,
  confidenceScore: Number,
  allScores: mongoose.Schema.Types.Mixed,
  reasoning: String, // Penjelasan dari AI
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SkillResult', skillResultSchema);