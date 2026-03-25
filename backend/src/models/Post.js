const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  name: String,
  avatar: { type: String, default: "👤" },
  skill: String,
  badge: String,
  text: String,
  likes: { type: Number, default: 0 },
  bg: { type: String, default: "rgba(31,122,99,0.1)" },
  color: { type: String, default: "#1F7A63" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', postSchema);