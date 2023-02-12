import { Router } from "express"

const router = Router()

router
	.get("/pokemon", (req, res, next) => {
		res.json("Pokemon routes")
	})
	.get("/pokemon/:id", (req, res) => {
		res.json(req.params.id)
	})

export default router
