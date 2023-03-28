import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import ErrorResponse from "../objects/ErrorResponse.js"

const getMonsterInfo = (monsterUid, monsterInfos) => monsterInfos.find((i) => i.uid === monsterUid)

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
	type: monsterDoc.info.monsterType.name,
	status: monsterDoc.status,
})

// Populate Monster data for frontend to render
const populateMonsterCollectionData = (monsterCollectionDoc) => ({
	uid: monsterCollectionDoc.uid,
	user_uid: monsterCollectionDoc.user_uid,
	capacity: monsterCollectionDoc.capacity,
	monster_list: monsterCollectionDoc.monster_list.map((i) => {
		const monsterInfo = getMonsterInfo(i.info_uid, monsterCollectionDoc.detailed_monster_list)

		return {
			uid: i.uid,
			type_uid: monsterInfo.uid,
			attack: i.attack,
			defense: i.attack,
			level: i.level,
			exp: i.exp,
			level_up_exp: i.level_up_exp,
			name: monsterInfo.name,
			monster_type: monsterInfo.monsterType.name,
			img_name: monsterInfo.img_name,
			status: monsterInfo.status,
		}
	}),
	status: monsterCollectionDoc.status,
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
			.populate({ path: "trainer_info" })
			.populate({
				path: "detailed_monster_list",
				populate: { path: "monsterType", select: "-_id -uid name" },
			})

		if (!monsterCollection) {
			return res.status(200).json([])
		}

		const detailedMonsterCollection = populateMonsterCollectionData(monsterCollection)

		return res.status(200).json(detailedMonsterCollection)
	} catch (error) {
		return next(error)
	}
}

// Assign a monster to Monster Team
export const assignMonsterToTeam = async (req, res, next) => {
	try {
		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })

		if (!monsterCollection) {
			return next(new ErrorResponse(404, "Collection is not found."))
		}

		// Check if the trainer has the monster in their collection
		const { monster_uid: monsterUID } = req.query
		if (!monsterUID) {
			return next(new ErrorResponse(400, "Can not find monster_uid in the query."))
		}

		// Already in the team
		const alreadyInTeam = monsterCollection.monster_team.findIndex((m) => m === monsterUID)
		if (alreadyInTeam !== -1) {
			return next(new ErrorResponse(400, "This monster is already assigned to the team."))
		}

		// Do not own the monster
		const ownMonster = monsterCollection.monster_list.findIndex((m) => m === monsterUID)
		if (ownMonster === -1) {
			return next(new ErrorResponse(400, "Can not find the monster in your collection."))
		}

		// Exceed the team member limit
		const GameServerSetting = await GameServerSettingModel.findOne({ status: "active" })

		if (monsterCollection.monster_team.length === GameServerSetting.monster_team_member_limit) {
			// Remove the first one and add to the collection
			const removedMonsterUID = monsterCollection.monster_team.shift()
			monsterCollection.monster_list.push(removedMonsterUID)
			// Add to the team
			monsterCollection.monster_team.push(monsterUID)
		} else {
			monsterCollection.monster_list.splice(ownMonster, 1)
			monsterCollection.monster_team.push(monsterUID)
		}

		// Update Monster Collection
		const updatedCollection = await MonsterCollectionModel.findOneAndUpdate(
			{ uid: monsterCollection.uid },
			{
				monster_list: [...monsterCollection.monster_list],
				monster_team: [...monsterCollection.monster_team],
			},
			{ new: true }
		)

		return res.status(200).json(updatedCollection)
	} catch (error) {
		return next(error)
	}
}

// Assign a monster to Monster Team
export const removeMonsterFromTeam = async (req, res, next) => {
	try {
		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })

		if (!monsterCollection) {
			return next(new ErrorResponse(404, "Collection is not found."))
		}

		// Check if the trainer has the monster in their collection
		const { monster_uid: monsterUID } = req.query
		if (!monsterUID) {
			return next(new ErrorResponse(400, "Can not find monster_uid in the query."))
		}

		// Not in the team
		const notInTeam = monsterCollection.monster_team.findIndex((m) => m === monsterUID)
		if (notInTeam === -1) {
			return next(new ErrorResponse(400, "This monster is not in the team."))
		}

		// Remove from the team and add to the collection
		monsterCollection.monster_team.splice(notInTeam, 1)
		monsterCollection.monster_list.push(monsterUID)

		// Update Monster Collection
		const updatedCollection = await MonsterCollectionModel.findOneAndUpdate(
			{ uid: monsterCollection.uid },
			{
				monster_list: [...monsterCollection.monster_list],
				monster_team: [...monsterCollection.monster_team],
			},
			{ new: true }
		)

		return res.status(200).json(updatedCollection)
	} catch (error) {
		return next(error)
	}
}
