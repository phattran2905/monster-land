import { Router } from "express"
import { logIn, signUp } from "../controllers/AccountController.js"

const router = Router()

router.post("/sign-up", signUp).post("/login", logIn)

export default router
