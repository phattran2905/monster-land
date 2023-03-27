import moment from "moment"
import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import IncubationModel from "../models/incubation/IncubationModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import ErrorResponse from "../objects/ErrorResponse.js"
import { getRandomNumber, randomUID } from "../util/random.js"

const getElementInfo = (itemUid, items) => items.find((i) => i.uid === itemUid)

// Populate Monster data for frontend to render
const populateItemData = (backpackDoc) => ({
	uid: backpackDoc.uid,
	user_uid: backpackDoc.user_uid,
	capacity: backpackDoc.capacity,
	item_list: backpackDoc.item_list.map((i) => {
		const itemInfo = getElementInfo(i.item_uid, backpackDoc.items)
		return {
			uid: itemInfo.uid,
			name: itemInfo.name,
			type: itemInfo.type,
			effect_property: itemInfo.effect_property,
			effect_value: itemInfo.effect_value,
			img_name: itemInfo.img_name,
			amount: i.amount,
			status: itemInfo.status,
		}
	}),
	egg_list: backpackDoc.egg_list.map((i) => {
		const eggInfo = getElementInfo(i.egg_uid, backpackDoc.eggs)
		return {
			uid: eggInfo.uid,
			name: eggInfo.name,
			monster_type: eggInfo.monsterType.name,
			hatching_time_in_seconds: eggInfo.hatching_time_in_seconds,
			img_name: eggInfo.img_name,
			amount: i.amount,
			status: eggInfo.status,
		}
	}),
	status: backpackDoc.status,
})

const populateIncubationData = (incubationDoc) => ({
	uid: incubationDoc.uid,
	user_uid: incubationDoc.uid,
	egg_uid: incubationDoc.uid,
	egg_type: incubationDoc.egg_info.name,
	done_hatching_time: incubationDoc.uid,
	incubator_img: incubationDoc.incubator_img,
	state: incubationDoc.status,
	createdAt: incubationDoc.createdAt,
})

// Get items from backpack
export const getItemsFromBackpack = async (req, res, next) => {
	try {
		const backpackDoc = await BackpackModel.findOne({ user_uid: req.user.uid })
			.populate({ path: "items" })
			.populate({ path: "eggs", populate: { path: "monsterType", select: "-_id -uid name" } })

		if (!backpackDoc) {
			return next(new ErrorResponse(404, "Backpack is not found"))
		}

		const backpack = populateItemData(backpackDoc)

		return res.status(200).json(backpack)
	} catch (error) {
		return next(error)
	}
}

export const useItemsOnMonster = async (req, res, next) => {
	try {
		const monsterUID = req.query?.monster
		const itemsToUse = req.body ?? []

		if (monsterUID && itemsToUse.length > 0) {
			const monsterDoc = await MonsterModel.findOne({ uid: monsterUID }).populate({
				path: "info",
				populate: { path: "monsterType", select: "-_id -uid name" },
			})
			const backpackDoc = await BackpackModel.findOne({ user_uid: req.user.uid }).populate(
				"items"
			)
			const backpack = populateItemData(backpackDoc)
			// Either of them not found
			if (!backpackDoc || !monsterDoc) {
				return next(new ErrorResponse(404, "Not found"))
			}

			// Use all items in the array
			await Promise.all(
				itemsToUse.map(async (item) => {
					const usedAmount = Number.parseInt(item.amount ?? 0, 10)
					const ownedItem = backpack.item_list.find((i) => i.uid === item.item_uid)

					if (!ownedItem) {
						throw new ErrorResponse(404, "Item is not found")
					}

					// Not a "monster" type item
					if (ownedItem.type !== "monster") {
						throw new ErrorResponse(400, "Can not use on monsters.")
					}

					// Check ownership
					if (ownedItem && usedAmount <= ownedItem.amount) {
						const effectValue = Number.parseInt(ownedItem.effect_value ?? 0, 10)
						const totalEffectValue = effectValue * usedAmount
						// Update effect
						if (ownedItem.effect_property === "attack") {
							monsterDoc.attack += totalEffectValue
						}

						if (ownedItem.effect_property === "defense") {
							monsterDoc.defense += totalEffectValue
						}

						if (ownedItem.effect_property === "exp") {
							const earnedEXP = monsterDoc.exp + totalEffectValue

							// Exceed the current exp
							if (earnedEXP >= monsterDoc.level_up_exp) {
								let currentExp = earnedEXP
								const GameServerSetting = await GameServerSettingModel.findOne({
									status: "active",
								})
								while (currentExp >= monsterDoc.level_up_exp) {
									// Level up
									monsterDoc.level += 1
									currentExp -= monsterDoc.level_up_exp

									monsterDoc.exp = currentExp
									// Update the new level_up_xep
									const levelUpExpRate = GameServerSetting.monster_lvl_up_exp_rate
									monsterDoc.level_up_exp = Math.floor(
										monsterDoc.level_up_exp * (1 + levelUpExpRate)
									)
								}
							} else {
								monsterDoc.exp = earnedEXP
							}
						}

						// Update amount in backpack
						backpack.item_list = backpack.item_list.map((i) => {
							if (i.uid === item.item_uid) {
								return {
									...i,
									amount: i.amount - usedAmount,
								}
							}
							return i
						})

						return ownedItem
					}

					return null
				})
			)

			// Update Monster with new changes
			const monster = await MonsterModel.findOneAndUpdate(
				{ uid: monsterDoc.uid },
				{ ...monsterDoc.toObject() },
				{ new: true }
			)

			// Update Backpack
			const updatedItemList = backpack.item_list.map((item) => ({
				item_uid: item.uid,
				amount: item.amount,
			}))
			await BackpackModel.findOneAndUpdate(
				{ uid: backpackDoc.uid },
				{ ...backpackDoc.toObject(), item_list: updatedItemList }
			)

			return res.status(200).json({ ...monsterDoc.toObject(), ...monster.toObject() })
		}

		return next(new Error(400, "Failed to use items"))
	} catch (error) {
		return next(error)
	}
}

// Get incubating eggs
export const getIncubatingEggs = async (req, res, next) => {
	try {
		const incubatingEggs = await IncubationModel.find({
			user_uid: req.user.uid,
			status: "incubating",
		})
			.populate({ path: "egg_info" })
			.sort({ createdAt: -1 })

		const populatedIncubatingEggs = incubatingEggs.map((e) => populateIncubationData(e))

		return res.status(200).json(populatedIncubatingEggs)
	} catch (error) {
		return next(error)
	}
}

// Incubate an egg
export const incubateAnEgg = async (req, res, next) => {
	try {
		const { egg_uid: eggUID } = req.query

		const backpack = await BackpackModel.findOne({ user_uid: req.user.uid }).populate({
			path: "eggs",
			populate: { path: "monsterType", select: "-_id -uid name" },
		})
		if (!backpack) {
			return next(new ErrorResponse(404, "Backpack is not found"))
		}

		// Do not have the egg
		const haveEgg = backpack.egg_list.findIndex((egg) => egg.egg_uid === eggUID)
		if (haveEgg === -1 || backpack.egg_list[haveEgg].amount < 1) {
			return next(new ErrorResponse(404, "Can not find this egg in your backpack."))
		}

		// Starting incubating
		const egg = backpack.eggs.find((e) => e.uid === eggUID)
		const incubatorImgName = `${egg.img_name.split(".png")[0]}-incubator.png`
		const now = moment()
		const duration = moment.duration(egg.hatching_time_in_seconds, "seconds")
		const timeForIncubation = now.clone()
		timeForIncubation.add(duration)
		await IncubationModel.create({
			uid: `Inc-${randomUID()}`,
			user_uid: req.user.uid,
			egg_uid: eggUID,
			done_hatching_time: timeForIncubation,
			incubator_img: incubatorImgName,
		})

		// Update amount
		backpack.egg_list[haveEgg].amount -= 1
		await BackpackModel.findOneAndUpdate(
			{ user_uid: req.user.uid },
			{ egg_list: [...backpack.egg_list] }
		)

		return res.status(200).json({ done_hatching_time: timeForIncubation })
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

		const randomAttackPts = getRandomNumber(50, 250)
		const randomDefensePts = getRandomNumber(50, 250)
		const GameServerSetting = await GameServerSettingModel.findOne({ status: "active" })
		const newMonster = await MonsterModel.create({
			uid: `M-${randomUID()}`,
			info_uid: monsterTypeUID,
			level: 1,
			level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
			attack: randomAttackPts,
			defense: randomDefensePts,
		})

		return res.status(200).json(newMonster)
	} catch (error) {
		return next(error)
	}
}
