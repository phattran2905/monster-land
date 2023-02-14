import { Router } from "express"
import {
	getPokemonById,
	getAllPokemon,
	findWildPokemon,
	captureWildPokemon,
} from "../controllers/PokemonController.js"

const router = Router()

router
	.get("/pokemon", getAllPokemon)
	.get("/pokemon/:id", getPokemonById)
	.post("/pokemon/find-wild", findWildPokemon)
	.put("/pokemon/capture/:pokemon_uid", captureWildPokemon)

export default router
