import Feedback from "../models/Feedback.js"

export const saveFeedback = async (req, res) => {

  try {

    const { name, email, rating, message } = req.body

    const feedback = new Feedback({
      name,
      email,
      rating,
      message
    })

    await feedback.save()

    res.json({
      success: true,
      data: feedback
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}