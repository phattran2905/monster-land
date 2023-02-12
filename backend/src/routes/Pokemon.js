import { Router } from "express"
import { v4 as uuidv4 } from "uuid"
import PokemonTypeModel from "../models/PokemonTypeModel.js"

const router = Router()

router
	.get("/pokemon", (req, res, next) => {
		res.json("Pokemon routes")
	})
	.post("/pokemon", async (req, res, next) => {
		try {
			const randomId = uuidv4()
			const electricType = await PokemonTypeModel.create({
				uid: randomId,
				name: "Electric",
			})

			res.json(electricType)
		} catch (error) {
			console.error(error)
		}
	})
	.get("/pokemon/:id", (req, res) => {
		res.json(req.params.id)
	})

export default router
