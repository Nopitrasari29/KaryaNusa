import UserAnalysis from "../models/UserAnalysis.js"

export const saveAnalysis = async (req, res) => {
  try {

    const { skill, confidenceScore, answers } = req.body

    const analysis = new UserAnalysis({
      skill,
      confidenceScore,
      answers
    })

    await analysis.save()

    res.json({
      success: true,
      data: analysis
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}