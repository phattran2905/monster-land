import { Router } from "express"
import { getItemsFromBackpack, useItemsOnMonster } from "../controllers/BackpackController.js"

const router = Router()

router.get("/backpack", getItemsFromBackpack).put("/backpack/use", useItemsOnMonster)

export default router
