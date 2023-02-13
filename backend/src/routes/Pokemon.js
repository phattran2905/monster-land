import { Router } from "express"
import { getPokemonById, getAllPokemon, findWildPokemon } from "../controllers/PokemonController.js"

const router = Router()

router
	.get("/pokemon", getAllPokemon)
	.get("/pokemon/:id", getPokemonById)
	.post("/pokemon/find-wild", findWildPokemon)

export default router
