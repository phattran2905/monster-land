import { Router } from "express"
import { v4 as uuidv4 } from "uuid"
import PokemonInfoModel from "../models/PokemonInfoModel.js"
import PokemonModel from "../models/PokemonModel.js"
import PokemonTypeModel from "../models/PokemonTypeModel.js"

const router = Router()

router
	.get("/pokemon", (req, res) => {
		res.json("Pokemon routes")
	})
	.post("/pokemon", async (req, res) => {
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
	.get("/pokemon/:id", async (req, res) => {
		try {
			const pokemonDoc = await PokemonModel.findOne({ uid: req.params.id }).populate({
				path: "info",
				populate: { path: "pkmType", select: "-_id -uid name" },
			})

			const pokemon = {
				uid: pokemonDoc.uid,
				level: pokemonDoc.level,
				exp: pokemonDoc.exp,
				level_up_exp: pokemonDoc.level_up_exp,
				power: pokemonDoc.power,
				capture_rate: pokemonDoc.capture_rate,
				name: pokemonDoc.info.name,
				img_name: pokemonDoc.info.img_name,
				level_up_exp_rate: pokemonDoc.info.level_up_exp_rate,
				type: pokemonDoc.info.pkmType.map((i) => i.name),
			}

			res.status(200).json(pokemon)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: error.message })
		}
	})

export default router
