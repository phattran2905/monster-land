import { Router } from "express"
import { getPokemonById, getAllPokemon } from "../controllers/PokemonController.js"

const router = Router()

router
	.get("/pokemon", getAllPokemon)
	.get("/pokemon/:id", getPokemonById)

export default router
