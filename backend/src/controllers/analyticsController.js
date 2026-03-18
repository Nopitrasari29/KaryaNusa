const SkillResult = require('../models/SkillResult');

exports.getStats = async (req, res) => {
  try {
    // Menghitung total data di collection skillresults
    const totalAnalisis = await SkillResult.countDocuments();
    
    // Mengelompokkan berdasarkan nama skill (Programming, Desain, dll)
    const skillDistribution = await SkillResult.aggregate([
      { $group: { _id: "$skillResult", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      activeUsers: totalAnalisis + 1250, // Angka dasar simulasi agar grafik tidak nol
      skillDistribution: skillDistribution,
      lastUpdate: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};