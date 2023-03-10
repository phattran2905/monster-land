import { Router } from "express"
import { logIn, logOut, signUp } from "../controllers/AuthenticationController.js"

const router = Router()

router.post("/sign-up", signUp).post("/login", logIn).put("/logout", logOut)

export default router
