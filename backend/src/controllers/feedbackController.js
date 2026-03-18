const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { name, rating, message, skill } = req.body;
    const newFeedback = new Feedback({ name, rating, message, skill });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback berhasil dikirim!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};