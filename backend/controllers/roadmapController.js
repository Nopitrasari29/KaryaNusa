import RoadmapProgress from "../models/RoadmapProgress.js"

export const saveProgress = async (req, res) => {

  try {

    const { skill, completedTasks, progress } = req.body

    const roadmap = new RoadmapProgress({
      skill,
      completedTasks,
      progress
    })

    await roadmap.save()

    res.json({
      success: true,
      data: roadmap
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}