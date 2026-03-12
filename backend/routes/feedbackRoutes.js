import express from "express"
import { saveFeedback } from "../controllers/feedbackController.js"

const router = express.Router()

router.post("/save", saveFeedback)

export default router