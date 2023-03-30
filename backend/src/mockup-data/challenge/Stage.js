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
		reward_eggs: [
			{ ...eggs[2], amount: 1 },
			{ ...eggs[1], amount: 1 },
		],
		reward_items: [
			{ ...items[2], amount: 1 },
			{ ...items[1], amount: 1 },
		],
		stamina_cost: 10,
	},
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #2",
		boss_img_name: "boss-2.png",
		boss_type_uid: findMonsterTypeUID("electric"),
		boss_attack: 50,
		boss_defense: 50,
		reward_exp: 200,
		reward_coins: 1000,
		reward_eggs: [
			{ ...eggs[2], amount: 2 },
			{ ...eggs[1], amount: 2 },
		],
		reward_items: [
			{ ...items[0], amount: 2 },
			{ ...items[1], amount: 2 },
		],
		stamina_cost: 20,
	},
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #3",
		boss_img_name: "boss-3.png",
		boss_type_uid: findMonsterTypeUID("fire"),
		boss_attack: 100,
		boss_defense: 100,
		reward_exp: 800,
		reward_coins: 2000,
		reward_eggs: [
			{ ...eggs[1], amount: 3 },
			{ ...eggs[2], amount: 3 },
		],
		reward_items: [
			{ ...items[1], amount: 3 },
			{ ...items[2], amount: 3 },
		],
		stamina_cost: 30,
	},
	{
		uid: `S-${randomUID()}`,
		boss_name: "Boss #4",
		boss_img_name: "boss-4.png",
		boss_type_uid: findMonsterTypeUID("water"),
		boss_attack: 250,
		boss_defense: 250,
		reward_exp: 2000,
		reward_coins: 5000,
		reward_eggs: [
			{ ...eggs[1], amount: 4 },
			{ ...eggs[2], amount: 4 },
		],
		reward_items: [
			{ ...items[1], amount: 4 },
			{ ...items[2], amount: 4 },
		],
		stamina_cost: 40,
	},
]

export default Stages
