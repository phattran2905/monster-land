import { Router } from "express"
import {
	getAllChallenge,
	getChallengeById,
	challengeBoss,
} from "../controllers/ChallengeController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/challenges", getAllChallenge)
	.get("/challenges/:id", getChallengeById)
	.put("/challenges", validateJwt, challengeBoss)

export default router
