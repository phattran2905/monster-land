import { Router } from "express"
import MonsterRouter from "./Monster.js"
import BackpackRouter from "./Backpack.js"
import AuthenticationRouter from "./Authentication.js"
import TrainerRouter from "./Trainer.js"
import ChallengeRouter from "./Challenge.js"
import IncubationRouter from "./Incubation.js"

const apiRouter = Router()
apiRouter.get("/", (req, res) => {
	res.status(200).json("Monster Land - API v1")
})

apiRouter.use(AuthenticationRouter)
apiRouter.use(TrainerRouter)
apiRouter.use(MonsterRouter)
apiRouter.use(BackpackRouter)
apiRouter.use(ChallengeRouter)
apiRouter.use(IncubationRouter)

export default apiRouter
