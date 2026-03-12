import mongoose from "mongoose"

const RoadmapProgressSchema = new mongoose.Schema({
  skill: String,
  completedTasks: {
    type: Array,
    default: []
  },
  progress: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("RoadmapProgress", RoadmapProgressSchema)