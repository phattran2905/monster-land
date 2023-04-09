import { Router } from "express"
import {
	getIncubatingEggs,
	getIncubatingEggByUId,
	incubateAnEgg,
	hatchAnEgg,
    skipHatchingTime
} from "../controllers/IncubationController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router
	.get("/incubation", validateJwt, getIncubatingEggs)
	.post("/incubation/incubate", validateJwt, incubateAnEgg)
	.post("/incubation/skip", validateJwt, skipHatchingTime)
	.post("/incubation/hatch", validateJwt, hatchAnEgg)
	.get("/incubation/:incubation_uid", validateJwt, getIncubatingEggByUId)

export default router
