import mongoose from "mongoose"

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Feedback", FeedbackSchema)