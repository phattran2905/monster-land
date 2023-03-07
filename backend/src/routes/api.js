import { Router } from "express"
import MonsterRouter from "./Monster.js"
import BackpackRouter from "./Backpack.js"
import AuthenticationRouter from "./Authentication.js"

const apiRouter = Router()
apiRouter.get("/", (req, res) => {
	res.status(200).json("Monster Land - API v1")
})

apiRouter.use(AuthenticationRouter)
apiRouter.use(MonsterRouter)
apiRouter.use(BackpackRouter)

export default apiRouter
