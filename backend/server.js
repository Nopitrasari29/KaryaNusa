import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import analysisRoutes from "./routes/analysisRoutes.js"
import roadmapRoutes from "./routes/roadmapRoutes.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/analysis", analysisRoutes)
app.use("/api/roadmap", roadmapRoutes)
app.use("/api/feedback", feedbackRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected")
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
})
.catch(err => console.error(err))