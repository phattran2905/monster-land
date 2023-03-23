import { Router } from "express"
import {
	createCharacter,
	getTrainerInfo,
	updateTrainerInfo,
} from "../controllers/TrainerController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.post("/trainer", validateJwt, createCharacter)
	.get("/trainer", validateJwt, getTrainerInfo)
	.put("/trainer", validateJwt, updateTrainerInfo)

export default router
