import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
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
	type: monsterDoc.info.monsterType.name,
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
export const getAllMonster = async (req, res, next) => {
	try {
		const criteria = req.query.status ? { status: req.query.status } : null

		const monsterListDoc = await MonsterModel.find(criteria).populate({
			path: "info",
			populate: { path: "monsterType", select: "-_id -uid name" },
		})

		const monsterList = monsterListDoc.map((monster) => populateMonsterData(monster))

		return res.status(200).json(monsterList)
	} catch (error) {
		return next(error)
	}
}

// Get Monster Collection
export const getMonsterCollection = async (req, res, next) => {
	try {
		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })
			.populate({ path: "monster_list_info" })
			.populate({ path: "trainer_info" })

		if (!monsterCollection) {
			return res.status(200).json([])
		}

		return res.status(200).json(monsterCollection)
	} catch (error) {
		return next(error)
	}
}
