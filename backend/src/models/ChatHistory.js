const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  skillContext: String,
  messages: [
    {
      role: { type: String, enum: ['user', 'ai'] },
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);