import { customAlphabet } from "nanoid"
import items from "./Item.js"

const nanoid = customAlphabet("1234567890abcdef", 10)

const Backpack = {
	uid: `Bp-${nanoid()}`,
	user_uid: `U-${nanoid()}`,
	item_list: items.map((i) => ({ item_uid: i.uid, amount: 10 })), // Add all items (10 each)
}

export default Backpack
