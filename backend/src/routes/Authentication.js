import { Router } from "express"
import { logIn, logOut, signUp } from "../controllers/AuthenticationController.js"
import validateJwt from "../middleware/JwtTokenHandler.js"

const router = Router()

router.post("/sign-up", signUp).post("/login", logIn).put("/logout", validateJwt, logOut)

export default router
