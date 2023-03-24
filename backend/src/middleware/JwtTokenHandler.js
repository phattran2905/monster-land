import jwt from "jsonwebtoken"
import AccountModel from "../models/user/AccountModel.js"

export default async function validateJwt(req, res, next) {
	try {
		const jwtToken = req.get("Authorization")?.split("Bearer ")[1]
		if (!jwtToken) {
			return res.status(401).json({ message: "[JWT] Invalid token." })
		}

		// Verify jwtToken
		const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET)
		const account = await AccountModel.findOne({
			uid: jwtData.uid,
			jwt_token: jwtToken,
			status: "active",
		})
		if (!account) {
			return res.status(401).json({ message: "[JWT] Unknown payload." })
		}

		req.user = account
		return next()
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ message: "[JWT] Token is expired." })
		}
		if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.NotBeforeError) {
			return res.status(401).json({ message: `[JWT] ${error.message}` })
		}

		return res.status(500).json({ message: "Internal Server Error" })
	}
}
