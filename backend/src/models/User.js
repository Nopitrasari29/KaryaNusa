const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  skillResult: String,
  roadmapProgress: {
    phase1: { type: [Boolean], default: [false, false, false, false] },
    phase2: { type: [Boolean], default: [false, false, false, false] },
    phase3: { type: [Boolean], default: [false, false, false, false] },
    phase4: { type: [Boolean], default: [false, false, false, false] }
  },
  badges: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);