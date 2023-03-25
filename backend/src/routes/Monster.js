import { Router } from "express"
import {
	getMonsterById,
	getAllMonster,
	getMonsterCollection,
} from "../controllers/MonsterController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/monster", getAllMonster)
	.get("/monster/collection", validateJwt, getMonsterCollection)
	.get("/monster/:id", getMonsterById)

export default router
