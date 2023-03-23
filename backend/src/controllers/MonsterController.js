import MonsterModel from "../models/monster/MonsterModel.js"
import MonsterInfoModel from "../models/monster/MonsterInfoModel.js"
import { getRandomNumber, getRandomArrayElement, randomUID } from "../util/random.js"
import ErrorResponse from "../objects/ErrorResponse.js"

// Populate Monster data for frontend to render
const populateMonsterData = (monsterDoc) => ({
	uid: monsterDoc.uid,
	level: monsterDoc.level,
	exp: monsterDoc.exp,
	level_up_exp: monsterDoc.level_up_exp,
	attack: monsterDoc.attack,
	defense: monsterDoc.defense,
	name: monsterDoc.info.name,
	img_name: monsterDoc.info.img_name,
	level_up_exp_rate: monsterDoc.info.level_up_exp_rate,
	type: monsterDoc.info.monsterType.map((i) => i.name),
	status: monsterDoc.status,
})

// Get A Monster by id
export const getMonsterById = async (req, res, next) => {
	try {
		const monsterDoc = await MonsterModel.findOne({ uid: req.params.id }).populate({
			path: "info",
			populate: { path: "monsterType", select: "-_id -uid name" },
		})

		if (!monsterDoc) {
			return next(new ErrorResponse(404, "Not found"))
		}

		const monster = populateMonsterData(monsterDoc)

		return res.status(200).json(monster)
	} catch (error) {
		return next(error)
	}
}

// Get All Monster
export const getAllMonster = async (req, res) => {
	try {
		const criteria = req.query.status ? { status: req.query.status } : null

		const monsterListDoc = await MonsterModel.find(criteria).populate({
			path: "info",
			populate: { path: "monsterType", select: "-_id -uid name" },
		})

		const monsterList = monsterListDoc.map((monster) => populateMonsterData(monster))

		return res.status(200).json(monsterList)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

// Find wild Monster
export const findWildMonster = async (req, res) => {
	try {
		const monsterList = await MonsterInfoModel.find({ status: "active" }).populate(
			"monsterType"
		)
		const randomMonster = getRandomArrayElement(monsterList)
		const LEVEL_UP_DEFAULT_EXP = 1000

		const wildMonsterDoc = await MonsterModel.create({
			uid: `M-${randomUID()}`,
			info_uid: randomMonster.uid,
			level_up_exp: LEVEL_UP_DEFAULT_EXP,
			attack: 10,
			defense: 10,
		})

		const wildMonster = {
			...wildMonsterDoc.toObject(),
			name: randomMonster.name,
			img_name: randomMonster.img_name,
			level_up_exp_rate: randomMonster.level_up_exp_rate,
			type: randomMonster.monsterType.map((i) => i.name),
		}

		return res.status(200).json(wildMonster)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

// Capture wild Monster
export const captureWildMonster = async (req, res) => {
	try {
		const wildMonster = await MonsterModel.findOne({ uid: req.params.monster_uid })
		if (!wildMonster) {
			return res.status(404).json({ message: "Not found" })
		}

		const randomRate = getRandomNumber(0, 100)
		const isCaptured = wildMonster.capture_rate >= randomRate

		const monster = {
			...wildMonster.toObject(),
			status: isCaptured ? "owned" : "wild",
			capture_rate: 0,
		}

		await MonsterModel.findOneAndUpdate({ uid: wildMonster.uid }, { ...monster })

		if (isCaptured) {
			return res.status(200).json({ message: "Succeeded", monster })
		}

		return res.status(200).json({ message: "Failed", monster })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
