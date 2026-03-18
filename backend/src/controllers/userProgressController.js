const UserProgress = require('../models/UserProgress');

exports.updateProgress = async (req, res) => {
  try {
    const { sessionId, activeSkill, completedTasks, unlockedBadges } = req.body;

    const progress = await UserProgress.findOneAndUpdate(
      { sessionId },
      { activeSkill, completedTasks, unlockedBadges, lastActivity: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: "Progress saved!", data: progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const data = await UserProgress.findOne({ sessionId: req.params.sessionId });
    res.json(data || { completedTasks: [], unlockedBadges: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};