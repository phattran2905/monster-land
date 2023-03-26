import AccountModel from "../models/user/AccountModel.js"
import TrainerModel from "../models/user/TrainerModel.js"
import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import { randomUID } from "../util/random.js"

const populateTrainerData = (trainerInfo) => ({
	uid: trainerInfo.uid,
	user_uid: trainerInfo.user_uid,
	name: trainerInfo.name,
	username: trainerInfo.account.username,
	email: trainerInfo.account.email,
	avatar: trainerInfo.avatar,
	level: trainerInfo.level,
	exp: trainerInfo.exp,
	level_up_exp: trainerInfo.level_up_exp,
	gold: trainerInfo.gold,
	diamond: trainerInfo.diamond,
	stamina: trainerInfo.stamina,
	max_stamina: trainerInfo.max_stamina,
	status: trainerInfo.status,
	createdAt: trainerInfo.createdAt,
})

export const createCharacter = async (req, res) => {
	try {
		// Validate required fields
		const { name, avatar } = req.body
		if (!name || !avatar) {
			return res.status(400).json({ message: "Missing fields. Require name, avatar" })
		}

		const GameServerSetting = await GameServerSettingModel.findOne({ status: "active" })

		// Create trainer
		await TrainerModel.create({
			uid: `T-${randomUID()}`,
			user_uid: req.user.uid,
			name,
			avatar,
			level_up_exp: GameServerSetting.trainer_lvl_up_exp_base,
		})

		return res.status(200).json({ message: "OK" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getTrainerInfo = async (req, res) => {
	try {
		// Find trainer
		const trainer = await TrainerModel.findOne({
			user_uid: req.user.uid,
			status: "active",
		}).populate({ path: "account" })

		if (!trainer) {
			return res.status(404).json({ message: "Trainer not found." })
		}

		const detailedTrainerInfo = populateTrainerData(trainer)

		return res.status(200).json(detailedTrainerInfo)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const updateTrainerInfo = async (req, res) => {
	try {
		// Find trainer
		const trainer = await TrainerModel.findOne({ user_uid: req.user.uid, status: "active" })
		if (!trainer) {
			return res.status(404).json({ message: "Trainer not found." })
		}

		// Validate required fields
		const { name, avatar, email } = req.body
		if (!name || !email || !avatar) {
			return res.status(400).json({ message: "Missing fields. Require name, email, avatar" })
		}

		// Existing email
		const accountWithSameEmail = await AccountModel.findOne({ email })
		if (accountWithSameEmail && accountWithSameEmail.uid !== trainer.user_uid) {
			return res.status(400).json({ message: "Email is already taken." })
		}

		// Update trainer
		const updatedTrainer = await TrainerModel.findOneAndUpdate(
			{ uid: trainer.uid },
			{
				name,
				avatar,
			},
			{ new: true }
		)

		// Update account
		const updatedAccount = await AccountModel.findOneAndUpdate(
			{ uid: trainer.user_uid },
			{
				email,
			},
			{ new: true }
		)

		if (!updatedAccount || !updatedTrainer) {
			return res.status(400).json({ message: "Failed to update trainer's information" })
		}

		return res.status(200).json({ message: "OK" })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
