import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import AccountModel from "../models/user/AccountModel.js"
import { randomUID } from "../util/random.js"

export const logIn = async (req, res) => {
	try {
		const { username, password } = req.body

		// Not found
		const account = await AccountModel.findOne({ username: username.toLowerCase() })
		if (!account) {
			return res.status(404).json({ message: "Account not found." })
		}

		// Check password
		const correctPassword = await bcrypt.compare(password, account.hashed_pwd)
		if (!correctPassword) {
			return res.status(401).json({ message: "Username or Password is incorrect." })
		}

		// Is banned
		if (account.status === "inactive") {
			return res.status(403).json({ message: "Your account was banned." })
		}

		// Generate JWT token
		const newJwtToken = jwt.sign({ uid: account.uid }, process.env.JWT_SECRET)

		// Update jwt and last_login
		account.jwt_token = newJwtToken
		account.last_login = Date.now()
		await account.save()

		return res.status(200).json({
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
			return res
				.status(400)
				.json({ message: "Missing fields. Require username, password, confirm." })
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

export const logOut = async (req, res) => {
	try {
		const jwtToken = req.get("Authorization").split("Bearer ")[1]
		if (!jwtToken) {
			return res.status(401).json({ message: "Invalid token." })
		}

		// Verify jwtToken
		const jwtData = jwt.verify(jwtToken, process.env.JWT_SECRET)
		const account = await AccountModel.findOne({ uid: jwtData.uid, status: "active" })
		if (!account) {
			return res.status(404).json({ message: "Account not found." })
		}

		// Remove jwt_token
		account.jwt_token = null
		account.last_login = Date.now()
		await account.save()

		return res.sendStatus(204)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
