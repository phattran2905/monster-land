import { Router } from "express"
import PokemonRouter from "./Pokemon.js"
import BackpackRouter from "./Backpack.js"

const apiRouter = Router()
apiRouter.get("/", (req, res) => {
	res.status(200).json("Pokemon Land - API v1")
})

apiRouter.use(PokemonRouter)
apiRouter.use(BackpackRouter)

export default apiRouter
