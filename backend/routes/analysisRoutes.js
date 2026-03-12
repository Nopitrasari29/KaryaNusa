import express from "express"
import { saveAnalysis } from "../controllers/analysisController.js"

const router = express.Router()

router.post("/save", saveAnalysis)

export default router