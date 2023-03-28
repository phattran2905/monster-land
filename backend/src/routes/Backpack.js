import { Router } from "express"
import {
	getItemsFromBackpack,
	useItemsOnMonster,
	getIncubatingEggs,
	getIncubatingEggByUId,
	incubateAnEgg,
	hatchAnEgg,
} from "../controllers/BackpackController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/backpack", validateJwt, getItemsFromBackpack)
	.put("/backpack/use", validateJwt, useItemsOnMonster)
	.get("/backpack/incubation", validateJwt, getIncubatingEggs)
	.post("/backpack/incubate", validateJwt, incubateAnEgg)
	.post("/backpack/hatch", validateJwt, hatchAnEgg)
	.get("/backpack/incubation/:incubation_uid", validateJwt, getIncubatingEggByUId)

export default router
