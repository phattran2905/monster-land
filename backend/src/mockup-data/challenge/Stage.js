import { randomUID } from "../../util/random.js"
import eggs from "../backpack/Egg.js"
import items from "../backpack/Item.js"
import bosses from "./Boss.js"

const Stages = [
	{
		uid: `S-${randomUID()}`,
		boss_uid: bosses[0],
		difficulty_level: 1,
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
		boss_uid: bosses[1],
		difficulty_level: 2,
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
		boss_uid: bosses[2],
		difficulty_level: 3,
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
		boss_uid: bosses[3],
		difficulty_level: 4,
		reward_exp: 1500,
		reward_coins: 3500,
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
