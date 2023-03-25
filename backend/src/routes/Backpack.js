import { Router } from "express"
import {
	getItemsFromBackpack,
	useItemsOnMonster,
	incubateAnEgg,
	hatchAnEgg,
} from "../controllers/BackpackController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/backpack", validateJwt, getItemsFromBackpack)
	.put("/backpack/use", validateJwt, useItemsOnMonster)
	.post("/backpack/incubate", validateJwt, incubateAnEgg)
	.post("/backpack/hatch", validateJwt, hatchAnEgg)

export default router
