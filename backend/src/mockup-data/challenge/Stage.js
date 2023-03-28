import { randomUID } from "../../util/random.js"
import { findMonsterTypeUID } from "../monster/MonsterType.js"
import eggs from "../backpack/Egg.js"
import items from "../backpack/Item.js"

const Stages = [
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #1",
		boss_img_name: "boss-1.png",
		boss_type_uid: findMonsterTypeUID("rock"),
		boss_attack: 30,
		boss_defense: 30,
		reward_exp: 100,
		reward_coins: 500,
		reward_items: [
			{ uid: eggs[2].uid, amount: 2 },
			{ uid: eggs[1].uid, amount: 1 },
		],
		reward_eggs: [
			{ uid: items[0].uid, amount: 3 },
			{ uid: items[1].uid, amount: 3 },
		],
		stamina_cost: 10,
	},
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #2",
		boss_img_name: "boss-1.png",
		boss_type_uid: findMonsterTypeUID("rock"),
		boss_attack: 30,
		boss_defense: 30,
		reward_exp: 100,
		reward_coins: 500,
		reward_items: [
			{ uid: eggs[2].uid, amount: 2 },
			{ uid: eggs[1].uid, amount: 1 },
		],
		reward_eggs: [
			{ uid: items[0].uid, amount: 3 },
			{ uid: items[1].uid, amount: 3 },
		],
		stamina_cost: 10,
	},
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #3",
		boss_img_name: "boss-1.png",
		boss_type_uid: findMonsterTypeUID("fire"),
		boss_attack: 30,
		boss_defense: 30,
		reward_exp: 100,
		reward_coins: 500,
		reward_items: [
			{ uid: eggs[1].uid, amount: 3 },
			{ uid: eggs[2].uid, amount: 3 },
		],
		reward_eggs: [
			{ uid: items[1].uid, amount: 3 },
			{ uid: items[2].uid, amount: 3 },
		],
		stamina_cost: 10,
	},
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #4",
		boss_img_name: "boss-1.png",
		boss_type_uid: findMonsterTypeUID("water"),
		boss_attack: 30,
		boss_defense: 30,
		reward_exp: 100,
		reward_coins: 500,
		reward_items: [
			{ uid: eggs[1].uid, amount: 4 },
			{ uid: eggs[2].uid, amount: 4 },
		],
		reward_eggs: [
			{ uid: items[1].uid, amount: 3 },
			{ uid: items[2].uid, amount: 3 },
		],
		stamina_cost: 10,
	},
]

export default Stages
