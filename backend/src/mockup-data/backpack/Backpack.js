import { randomUID } from "../../util/random.js"
import items from "./Item.js"
import account from "../user/Account.js"

const Backpack = {
	uid: `Bp-${randomUID()}`,
	user_uid: account.uid,
	item_list: items.map((i) => ({ item_uid: i.uid, amount: 10 })), // Add all items (10 each)
}

export default Backpack
