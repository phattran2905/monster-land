import { Router } from "express"
import {
	getMonsterById,
	getAllMonster,
	getMonsterCollection,
	assignMonsterToTeam,
	removeMonsterFromTeam,
} from "../controllers/MonsterController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/monster", getAllMonster)
	// Collection
	.get("/monster/collection", validateJwt, getMonsterCollection)
	// Team
	.put("/monster/team/assign", validateJwt, assignMonsterToTeam)
	.delete("/monster/team/remove", validateJwt, removeMonsterFromTeam)
	.get("/monster/:id", getMonsterById)

export default router
