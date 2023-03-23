import { Router } from "express"
import { getMonsterById, getAllMonster } from "../controllers/MonsterController.js"

const router = Router()

router.get("/monster", getAllMonster).get("/monster/:id", getMonsterById)

export default router
