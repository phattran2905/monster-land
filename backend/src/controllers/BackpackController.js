import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import ErrorResponse from "../objects/ErrorResponse.js"
import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"

const getElementInfo = (itemUid, items) => items.find((i) => i.uid === itemUid)

// Populate Monster data for frontend to render
export const populateItemData = (backpackDoc) => ({
	uid: backpackDoc.uid,
	user_uid: backpackDoc.user_uid,
	capacity: backpackDoc.capacity,
	item_list: backpackDoc.item_list.map((i) => {
		const itemInfo = getElementInfo(i.uid, backpackDoc.items)

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
		const eggInfo = getElementInfo(i.uid, backpackDoc.eggs)
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

// Get items from backpack
export const getItemsFromBackpack = async (req, res, next) => {
	try {
		const backpackDoc = await BackpackModel.findOne({ user_uid: req.user.uid })
			.populate({ path: "items" })
			.populate({ path: "eggs", populate: { path: "monsterType", select: "-_id" } })

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
				populate: { path: "monsterType", select: "-_id uid name" },
			})
			// Monster is not found
			if (!monsterDoc) {
				return next(new ErrorResponse(404, "Monster is not found"))
			}
			const backpackDoc = await BackpackModel.findOne({ user_uid: req.user.uid }).populate({
				path: "items",
			})

			// Backpack is not found
			if (!monsterDoc) {
				return next(new ErrorResponse(404, "Backpack is not found"))
			}

			// Map item's information with item_list
			const itemsInBackpack = backpackDoc.item_list.map((i) => {
				const itemInfo = backpackDoc.items.findIndex((info) => info.uid === i.uid)

				return {
					...backpackDoc.items[itemInfo].toObject(),
					amount: i.amount,
				}
			})

			// Use all items in the array
			await Promise.all(
				itemsToUse.map(async (item) => {
					const usedAmount = Number.parseInt(item.amount ?? 0, 10)
					const ownedItem = itemsInBackpack.find((i) => i.uid === item.uid)

					if (!ownedItem) {
						throw new ErrorResponse(404, "Item is not found in your backpack")
					}

					// // Not a "monster" type item
					if (ownedItem?.type !== "monster") {
						throw new ErrorResponse(400, "Can not use on monsters.")
					}

					const GameServerSetting = await GameServerSettingModel.findOne({
						status: "active",
					})

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
						const updatedAmountItems = itemsInBackpack.map((i) => {
							let updatedAmount = i.amount
							if (i.uid === item.uid) {
								updatedAmount =
									i.amount - usedAmount > 0 ? i.amount - usedAmount : 0
							}
							return {
								...i,
								amount: updatedAmount,
							}
						})
						backpackDoc.item_list = updatedAmountItems.filter((i) => i.amount > 0)

						return ownedItem
					}

					return null
				})
			)

			// Update Monster with new changes
			await monsterDoc.save()

			// Update Monster Collection
			const monsterCollection = await MonsterCollectionModel.findOne({
				user_uid: req.user.uid,
			})
			const updatedCollection = monsterCollection.monster_list.map((m) => {
				if (m.uid === monsterDoc.uid) {
					return monsterDoc
				}

				return m
			})
			monsterCollection.monster_list = updatedCollection
			await monsterCollection.save()

			// Update Backpack
			const updatedItemList = backpackDoc.item_list.map((item) => ({
				uid: item.uid,
				amount: item.amount,
			}))
			await BackpackModel.findOneAndUpdate(
				{ uid: backpackDoc.uid },
				{ ...backpackDoc.toObject(), item_list: updatedItemList }
			)

			return res.status(200).json({ ...monsterDoc.toObject() })
		}

		return next(new Error(400, "Failed to use items"))
	} catch (error) {
		return next(error)
	}
}
