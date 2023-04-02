import moment from "moment"
import ErrorResponse from "../objects/ErrorResponse.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import IncubationModel from "../models/incubation/IncubationModel.js"
import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"
import MonsterInfoModel from "../models/monster/MonsterInfoModel.js"
import { getRandomNumber, randomUID, getRandomArrayElement } from "../util/random.js"
import { populateItemData } from "./BackpackController.js"

const populateIncubationData = (incubationDoc) => ({
	uid: incubationDoc.uid,
	user_uid: incubationDoc.uid,
	monster_type: incubationDoc.egg_info.monsterType.name,
	egg_uid: incubationDoc.uid,
	egg_type: incubationDoc.egg_info.name,
	done_hatching_time: incubationDoc.done_hatching_time,
	img_name: incubationDoc.img_name,
	status: incubationDoc.status,
	createdAt: incubationDoc.createdAt,
})

// Get incubating eggs
export const getIncubatingEggs = async (req, res, next) => {
	try {
		const incubatingEggs = await IncubationModel.find({
			user_uid: req.user.uid,
			status: "incubating",
		})
			.populate({ path: "egg_info", populate: { path: "monsterType" } })
			.sort({ createdAt: -1 })

		const populatedIncubatingEggs = incubatingEggs.map((e) => populateIncubationData(e))

		return res.status(200).json(populatedIncubatingEggs)
	} catch (error) {
		return next(error)
	}
}

// Get incubating eggs
export const getIncubatingEggByUId = async (req, res, next) => {
	try {
		const { incubation_uid: incubationUID } = req.params

		const incubatingEgg = await IncubationModel.findOne({
			user_uid: req.user.uid,
			uid: incubationUID ?? null,
			status: "incubating",
		}).populate({ path: "egg_info", populate: { path: "monsterType" } })

		const populatedIncubatingEgg = populateIncubationData(incubatingEgg)

		return res.status(200).json(populatedIncubatingEgg)
	} catch (error) {
		return next(error)
	}
}

// Incubate an egg
export const incubateAnEgg = async (req, res, next) => {
	try {
		const { egg_uid: eggUID } = req.query

		const incubation = await IncubationModel.find({
			user_uid: req.user.uid,
			status: "incubating",
		})
console.log(incubation?.length)
		// Can not incubate simultaneously more than two eggs.
		if (incubation?.length >= 2) {
			return next(
				new ErrorResponse(
					400,
					"Please free up your incubators before starting a new one."
				)
			)
		}

		const backpack = await BackpackModel.findOne({ user_uid: req.user.uid })
			.populate({ path: "items" })
			.populate({ path: "eggs", populate: { path: "monsterType", select: "-_id -uid name" } })

		if (!backpack) {
			return next(new ErrorResponse(404, "Backpack is not found"))
		}

		const backpackDoc = populateItemData(backpack)

		// Do not have the egg
		const haveEgg = backpackDoc.egg_list.findIndex((egg) => egg.uid === eggUID)
		if (haveEgg === -1 || backpackDoc.egg_list[haveEgg].amount < 1) {
			return next(new ErrorResponse(404, "Can not find this egg in your backpack."))
		}

		// Starting incubating
		const egg = backpackDoc.egg_list[haveEgg]
		const incubatorImgName = `${egg.img_name.split(".png")[0]}-incubator.png`
		const now = moment()
		const duration = moment.duration(egg.hatching_time_in_seconds, "seconds")
		const timeForIncubation = now.clone()
		timeForIncubation.add(duration)
		const newIncubation = {
			uid: `Inc-${randomUID()}`,
			user_uid: req.user.uid,
			egg_uid: egg.uid,
			egg_name: egg.name,
			monster_type: egg.monster_type,
			done_hatching_time: timeForIncubation,
			img_name: incubatorImgName,
		}
		await IncubationModel.create(newIncubation)

		// Update amount of the egg list
		backpackDoc.egg_list[haveEgg].amount -= 1
		const updatedEggList = [...backpackDoc.egg_list].filter((e) => e.amount > 0)
		await BackpackModel.findOneAndUpdate(
			{ user_uid: req.user.uid },
			{ egg_list: updatedEggList }
		)

		return res.status(200).json(newIncubation)
	} catch (error) {
		return next(error)
	}
}

// Hatch the egg
export const hatchAnEgg = async (req, res, next) => {
	try {
		const { incubation_uid: incubationUID } = req.query

		const incubation = await IncubationModel.findOne({
			uid: incubationUID,
			status: "incubating",
		})
		if (!incubation) {
			return next(new ErrorResponse(404, "Can not find your egg that are in incubation."))
		}

		// Check hatching_time
		const now = moment()
		const doneHatchingTime = moment(incubation.done_hatching_time)
		// Still in incubation time
		if (doneHatchingTime.diff(now, "seconds") > 0) {
			return next(
				new ErrorResponse(400, "This egg needs more time to hatch. Come back later.")
			)
		}

		const updatedIncubation = await IncubationModel.findOneAndUpdate(
			{ uid: incubationUID },
			{ status: "done" },
			{ new: true }
		).populate({ path: "egg_info", populate: { path: "monsterType" } })

		// Create a new monster
		const { monster_type_uid: monsterTypeUID } = updatedIncubation.egg_info
		const { name: monsterType } = updatedIncubation.egg_info.monsterType

		const randomAttackPts = getRandomNumber(50, 250)
		const randomDefensePts = getRandomNumber(50, 250)
		const GameServerSetting = await GameServerSettingModel.findOne({ status: "active" })
		// Random a monster from monster's types
		const monsterInfosWithSameType = await MonsterInfoModel.find({
			type: monsterTypeUID,
			status: "active",
		})
		const randomMonsterInfo = getRandomArrayElement(monsterInfosWithSameType)

		const newMonster = {
			uid: `M-${randomUID()}`,
			name: randomMonsterInfo.name,
			info_uid: randomMonsterInfo.uid,
			exp: 0,
			level: 1,
			level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
			attack: randomAttackPts,
			defense: randomDefensePts,
			img_name: randomMonsterInfo.img_name,
		}
		await MonsterModel.create(newMonster)

		// Add new monster to monster collection
		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })
		monsterCollection.monster_list = [...monsterCollection.monster_list, newMonster]
		await monsterCollection.save()

		return res.status(200).json({ ...newMonster, monster_type: monsterType })
	} catch (error) {
		return next(error)
	}
}
