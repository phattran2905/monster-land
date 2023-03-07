import { Router } from "express"
import {
	getMonsterById,
	getAllMonster,
	findWildMonster,
	captureWildMonster,
} from "../controllers/MonsterController.js"

const router = Router()

router
	.get("/monster", getAllMonster)
	.get("/monster/:id", getMonsterById)
	.post("/monster/find-wild", findWildMonster)
	.put("/monster/capture/:monster_uid", captureWildMonster)

export default router
