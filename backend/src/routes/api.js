import { Router } from "express"
import PokemonRouter from "./Pokemon.js"

const apiRouter = Router()
apiRouter.get("/", (req, res) => {
	res.status(200).json("Pokemon Land - API v1")
})

apiRouter.use(PokemonRouter)

export default apiRouter
