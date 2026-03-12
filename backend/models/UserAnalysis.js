import mongoose from "mongoose"

const UserAnalysisSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  confidenceScore: {
    type: Number,
    required: true
  },
  answers: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("UserAnalysis", UserAnalysisSchema)