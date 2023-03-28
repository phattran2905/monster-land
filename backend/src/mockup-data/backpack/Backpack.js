import { randomUID } from "../../util/random.js"
import items from "./Item.js"
import account from "../user/Account.js"
import eggs from "./Egg.js"
import GameServerSetting from "../game-server.js"

const Backpack = {
	uid: `Bp-${randomUID()}`,
	user_uid: account.uid,
	// item_list: items.map((i) => ({ item_uid: i.uid, amount: 10 })), // Add all items (5 each)
	// egg_list: eggs.map((e) => ({ egg_uid: e.uid, amount: 5 })), // Add all items (10 each),
	item_list: items.map((i) => ({ ...i, amount: 10 })),
	egg_list: eggs.map((e) => ({ ...e, amount: 10 })),
	capacity: {
		egg: GameServerSetting.backpack_egg_list_capacity_base,
		item: GameServerSetting.backpack_item_list_capacity_base,
	},
}

export default Backpack
