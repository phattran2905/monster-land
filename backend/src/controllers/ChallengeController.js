import ChallengeModel from "../models/challenge/ChallengeModel.js"
import ChallengeLogModel from "../models/challenge/ChallengeLogModel.js"
import StageModel from "../models/challenge/StageModel.js"
import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import ErrorResponse from "../objects/ErrorResponse.js"

// Get A Challenge by id
export const getChallengeById = async (req, res, next) => {
	try {
		const challengeDoc = await ChallengeModel.findOne({ uid: req.params.id }).populate({
			path: "stage_info",
		})
		if (!challengeDoc) {
			return next(new ErrorResponse(404, "Not found"))
		}

		return res.status(200).json(challengeDoc)
	} catch (error) {
		return next(error)
	}
}

// Get All Challenge
export const getAllChallenge = async (req, res, next) => {
	try {
		const criteria = req.query.status ? { status: req.query.status } : null

		const challengeListDoc = await ChallengeModel.find(criteria).populate({
			path: "stage_info",
		})

		return res.status(200).json(challengeListDoc)
	} catch (error) {
		return next(error)
	}
}

// Get Challenge Collection
// export const getMonsterCollection = async (req, res, next) => {
// 	try {
// 		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })
// 			.populate({ path: "monster_list_info" })
// 			.populate({ path: "trainer_info" })

// 		if (!monsterCollection) {
// 			return res.status(200).json([])
// 		}

// 		return res.status(200).json(monsterCollection)
// 	} catch (error) {
// 		return next(error)
// 	}
// }

// // Assign a challenge to Challenge Team
// export const assignMonsterToTeam = async (req, res, next) => {
// 	try {
// 		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })

// 		if (!monsterCollection) {
// 			return next(new ErrorResponse(404, "Collection is not found."))
// 		}

// 		// Check if the trainer has the challenge in their collection
// 		const { monster_uid: monsterUID } = req.query
// 		if (!monsterUID) {
// 			return next(new ErrorResponse(400, "Can not find monster_uid in the query."))
// 		}

// 		// Already in the team
// 		const alreadyInTeam = monsterCollection.monster_team.findIndex((m) => m === monsterUID)
// 		if (alreadyInTeam !== -1) {
// 			return next(new ErrorResponse(400, "This challenge is already assigned to the team."))
// 		}

// 		// Do not own the challenge
// 		const ownMonster = monsterCollection.monster_list.findIndex((m) => m === monsterUID)
// 		if (ownMonster === -1) {
// 			return next(new ErrorResponse(400, "Can not find the challenge in your collection."))
// 		}

// 		// Exceed the team member limit
// 		const GameServerSetting = await GameServerSettingModel.findOne({ status: "active" })

// 		if (monsterCollection.monster_team.length === GameServerSetting.monster_team_member_limit) {
// 			// Remove the first one and add to the collection
// 			const removedMonsterUID = monsterCollection.monster_team.shift()
// 			monsterCollection.monster_list.push(removedMonsterUID)
// 			// Add to the team
// 			monsterCollection.monster_team.push(monsterUID)
// 		} else {
// 			monsterCollection.monster_list.splice(ownMonster, 1)
// 			monsterCollection.monster_team.push(monsterUID)
// 		}

// 		// Update Challenge Collection
// 		const updatedCollection = await MonsterCollectionModel.findOneAndUpdate(
// 			{ uid: monsterCollection.uid },
// 			{
// 				monster_list: [...monsterCollection.monster_list],
// 				monster_team: [...monsterCollection.monster_team],
// 			},
// 			{ new: true }
// 		)

// 		return res.status(200).json(updatedCollection)
// 	} catch (error) {
// 		return next(error)
// 	}
// }

// // Assign a challenge to Challenge Team
// export const removeMonsterFromTeam = async (req, res, next) => {
// 	try {
// 		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })

// 		if (!monsterCollection) {
// 			return next(new ErrorResponse(404, "Collection is not found."))
// 		}

// 		// Check if the trainer has the challenge in their collection
// 		const { monster_uid: monsterUID } = req.query
// 		if (!monsterUID) {
// 			return next(new ErrorResponse(400, "Can not find monster_uid in the query."))
// 		}

// 		// Not in the team
// 		const notInTeam = monsterCollection.monster_team.findIndex((m) => m === monsterUID)
// 		if (notInTeam === -1) {
// 			return next(new ErrorResponse(400, "This challenge is not in the team."))
// 		}

// 		// Remove from the team and add to the collection
// 		monsterCollection.monster_team.splice(notInTeam, 1)
// 		monsterCollection.monster_list.push(monsterUID)

// 		// Update Challenge Collection
// 		const updatedCollection = await MonsterCollectionModel.findOneAndUpdate(
// 			{ uid: monsterCollection.uid },
// 			{
// 				monster_list: [...monsterCollection.monster_list],
// 				monster_team: [...monsterCollection.monster_team],
// 			},
// 			{ new: true }
// 		)

// 		return res.status(200).json(updatedCollection)
// 	} catch (error) {
// 		return next(error)
// 	}
// }
