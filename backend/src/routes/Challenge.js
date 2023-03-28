import { Router } from "express"
import { getAllChallenge, getChallengeById } from "../controllers/ChallengeController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router.get("/challenges", getAllChallenge).get("/challenges/:id", getChallengeById)

export default router
