import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import AccountModel from "../models/user/AccountModel.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import EggModel from "../models/backpack/EggModel.js"
import ItemModel from "../models/backpack/ItemModel.js"
import { randomUID } from "../util/random.js"
import GSSettingModel from "../models/setting/GSSettingModel.js"
import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"

export const logIn = async (req, res) => {
	try {
		const { username, password } = req.body

		// Not found
		const account = await AccountModel.findOne({ username: username.toLowerCase() })
		if (!account) {
			return res.status(404).json({ message: "Username or Password is incorrect." })
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

		// Not have JWT token
		if (!account.jwt_token) {
			// Generate JWT token
			const newJwtToken = jwt.sign({ uid: account.uid }, process.env.JWT_SECRET)

			// Update jwt and last_login
			account.jwt_token = newJwtToken
		}

		account.last_login = Date.now()
		await account.save()

		return res.status(200).json({
			message: "OK",
			data: {
				jwt_token: account.jwt_token,
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
		const isDuplicatedUsername = await AccountModel.findOne({ username: username.toLowerCase() })
		if (isDuplicatedUsername) {
			return res.status(400).json({ message: "Username is already taken." })
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

		// Add items and eggs for beginner
		const eggs = await EggModel.find({ status: "active" })
		const items = await ItemModel.find({ status: "active" })

		// Get Game Server Setting
		const GameServerSetting = await GSSettingModel.findOne({ status: "active" })
		// Create Backpack
		await BackpackModel.create({
			uid: `Bp-${randomUID()}`,
			user_uid: accountUID,
			item_list: items.map((i) => ({ ...i.toObject(), amount: 10 })),
			egg_list: eggs.map((i) => ({ ...i.toObject(), amount: 5 })),
			capacity: {
				egg: GameServerSetting.backpack_egg_list_capacity_base,
				item: GameServerSetting.backpack_item_list_capacity_base,
			},
		})

		// Create Monster Collection
		await MonsterCollectionModel.create({
			uid: `MC-${randomUID()}`,
			user_uid: accountUID,
			monster_list: [],
			monster_team: [],
			capacity: GameServerSetting.monster_collection_limit,
		})

		return res.status(200).json({ message: "OK" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const logOut = async (req, res) => {
	try {
		const account = await AccountModel.findOne({
			uid: req.user.uid,
			status: "active",
		})
		if (!account) {
			return res.status(404).json({ message: "Account not found." })
		}

		// Remove jwt_token
		account.jwt_token = null
		account.last_login = Date.now()
		await account.save()

		return res.status(200).json({ message: "OK" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
