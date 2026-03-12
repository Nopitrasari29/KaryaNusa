import express from "express"
import { saveProgress } from "../controllers/roadmapController.js"

const router = express.Router()

router.post("/save", saveProgress)

export default router