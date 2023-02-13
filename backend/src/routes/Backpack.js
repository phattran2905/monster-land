import { Router } from "express"
import { getItemsFromBackpack, useItemsOnPokemon } from "../controllers/BackpackController.js"

const router = Router()

router.get("/backpack", getItemsFromBackpack).put("/backpack/use", useItemsOnPokemon)

export default router
