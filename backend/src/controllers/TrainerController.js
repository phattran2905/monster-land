import jwt from "jsonwebtoken"
import AccountModel from "../models/user/AccountModel.js"
import TrainerModel from "../models/user/TrainerModel.js"
import { randomUID } from "../util/random.js"

export const createCharacter = async (req, res) => {
	try {
		const jwtToken = req.get("Authorization")?.split("Bearer ")[1]
		if (!jwtToken) {
			return res.status(401).json({ message: "Invalid token." })
		}

		// Verify jwtToken
		const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET)
		const account = await AccountModel.findOne({
			uid: jwtData.uid,
			jwt_token: jwtToken,
			status: "active",
		})
		if (!account) {
			return res.status(404).json({ message: "Account not found." })
		}

		// Validate required fields
		const { name, gender, avatar } = req.body
		if (!name || !gender || !avatar) {
			return res.status(400).json({ message: "Missing fields. Require name, gender, avatar" })
		}

		// Create trainer
		await TrainerModel.create({
			uid: `T-${randomUID()}`,
			user_uid: account.uid,
			name,
			gender,
			avatar,
		})

		return res.sendStatus(201)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getTrainerInfo = async (req, res) => {
	try {
		const jwtToken = req.get("Authorization")?.split("Bearer ")[1]
		if (!jwtToken) {
			return res.status(401).json({ message: "Invalid token." })
		}

		// Verify jwtToken
		const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET)
		const account = await AccountModel.findOne({
			uid: jwtData.uid,
			jwt_token: jwtToken,
			status: "active",
		})
		if (!account) {
			return res.status(404).json({ message: "Account not found." })
		}

		// Find trainer
		const trainer = await TrainerModel.findOne({ user_uid: account.uid, status: "active" })
		if (!trainer) {
			return res.status(404).json({ message: "Trainer not found." })
		}
		console.log(trainer)

		return res.status(200).json({ message: "OK", data: trainer })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
