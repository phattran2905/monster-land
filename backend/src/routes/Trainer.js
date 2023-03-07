import { Router } from "express"
import {
	createCharacter,
	getTrainerInfo,
	updateTrainerInfo,
} from "../controllers/TrainerController.js"

const router = Router()

router
	.post("/trainer", createCharacter)
	.get("/trainer", getTrainerInfo)
	.put("/trainer", updateTrainerInfo)

export default router
