const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  activeSkill: String,
  completedTasks: [String], // Format: "phaseID-taskIndex" (contoh: "1-0")
  unlockedBadges: [String], // Contoh: ["FirstStep", "FastLearner"]
  lastActivity: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserProgress', userProgressSchema);