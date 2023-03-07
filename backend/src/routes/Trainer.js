import { Router } from "express"
import { createCharacter, getTrainerInfo } from "../controllers/TrainerController.js"

const router = Router()

router.post("/trainer", createCharacter).get("/trainer", getTrainerInfo)

export default router
