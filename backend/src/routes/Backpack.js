import { Router } from "express"
import { getItemsFromBackpack } from "../controllers/BackpackController.js"

const router = Router()

router.get("/backpack", getItemsFromBackpack)

export default router
