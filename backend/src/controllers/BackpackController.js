import BackpackModel from "../models/backpack/BackpackModel.js"

const getItemInfo = (itemUid, items) => items.find((i) => i.uid === itemUid)

// Populate Pokemon data for frontend to render
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

export const getAllBackpack = async (req, res) => {}
