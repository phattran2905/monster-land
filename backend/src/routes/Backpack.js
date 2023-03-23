import { Router } from "express"
import { getItemsFromBackpack, useItemsOnMonster } from "../controllers/BackpackController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/backpack", validateJwt, getItemsFromBackpack)
	.put("/backpack/use", validateJwt, useItemsOnMonster)

export default router
