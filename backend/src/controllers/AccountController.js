import bcrypt from "bcryptjs"
import AccountModel from "../models/user/AccountModel.js"
import { randomUID } from "../util/random.js"

export const logIn = async (req, res) => {
	try {
		const { username, password } = req.body

		const account = await AccountModel.findOne({ username: username.toLowerCase() })

		if (!account) {
			return res.status(404).json({ message: "User not found." })
		}

		// Generate JWT token
		const newJwtToken = "1234"

		return res.status(200).message({
			message: "OK",
			data: {
				jwt_token: newJwtToken,
			},
		})
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const signUp = async (req, res) => {
	try {
		const { username, password, confirm } = req.body

		if (!username || !password || !confirm) {
			return res.status(400).json({ message: "Require username, password, confirm" })
		}

		// Password and Confirm do not match
		if (password !== confirm) {
			return res.status(400).json({ message: "Password does not match with Confirm." })
		}

		// Duplicated Username
		const isDuplicatedUsername = await AccountModel.findOne({ username })
		if (isDuplicatedUsername) {
			return res.status(400).json({ message: "username is already taken." })
		}

		// Create account
		const accountUID = `A-${randomUID()}`
		const hashedPwd = await bcrypt.hash(password, await bcrypt.genSalt(10))
		const newAccount = await AccountModel.create({
			uid: accountUID,
			username,
			hashed_pwd: hashedPwd,
		})

		if (!newAccount) {
			return res.status(400).json({ message: "Failed to sign up" })
		}

		return res.sendStatus(201)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
