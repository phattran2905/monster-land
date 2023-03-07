import BackpackModel from "../models/backpack/BackpackModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"

const getItemInfo = (itemUid, items) => items.find((i) => i.uid === itemUid)

// Populate Monster data for frontend to render
const populateItemData = (backpackDoc) => ({
	uid: backpackDoc.uid,
	user_uid: backpackDoc.user_uid,
	capacity: backpackDoc.capacity,
	item_list: backpackDoc.item_list.map((i) => {
		const itemInfo = getItemInfo(i.item_uid, backpackDoc.items)
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
	status: backpackDoc.status,
})

// Get items from backpack
export const getItemsFromBackpack = async (req, res) => {
	try {
		const backpackDoc = await BackpackModel.findOne().populate({
			path: "items",
		})

		const backpack = populateItemData(backpackDoc)

		return res.status(200).json(backpack)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message })
	}
}

export const useItemsOnMonster = async (req, res) => {
	try {
		const backpackUID = req.query?.backpack
		const monsterUID = req.query?.monster
		const itemsToUse = req.body ?? []

		if (backpackUID && monsterUID && itemsToUse.length > 0) {
			const monsterDoc = await MonsterModel.findOne({ uid: monsterUID }).populate({
				path: "info",
				populate: { path: "monsterType", select: "-_id -uid name" },
			})
			const backpackDoc = await BackpackModel.findOne({ uid: backpackUID }).populate("items")
			const backpack = populateItemData(backpackDoc)
			// Either of them not found
			if (!backpackDoc || !monsterDoc) {
				return res.status(404).json({ message: "Not found" })
			}

			// Use all items in the array
			await Promise.all(
				itemsToUse.map(async (item) => {
					const usedAmount = Number.parseInt(item.amount ?? 0, 10)
					const ownedItem = backpack.item_list.find((i) => i.uid === item.item_uid)
					// Check ownership
					if (ownedItem && usedAmount <= ownedItem.amount) {
						const effectValue = Number.parseInt(ownedItem.effect_value ?? 0, 10)
						const totalEffectValue = effectValue * usedAmount
						// Update effect
						if (ownedItem.effect_property === "capture-rate") {
							monsterDoc.capture_rate += totalEffectValue

							if (monsterDoc.capture_rate > 100) monsterDoc.capture_rate = 100
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

			// Update Monster
			const monster = await MonsterModel.findOneAndUpdate(
				{ uid: monsterDoc.uid },
				{ ...monsterDoc.toObject() },
				{ new: true }
			)

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

		return res.status(400).json({ message: "Failed to use items" })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: error.message })
	}
}
