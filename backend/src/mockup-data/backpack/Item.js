import { randomUID } from "../../util/random.js"

const ITEM_TYPE = {
	MONSTER: "monster",
	INCUBATOR: "incubator",
}

const usableItems = [
	{
		uid: `I-${randomUID()}`,
		name: "EXP Boosting Serum",
		type: ITEM_TYPE.MONSTER,
		effect_property: "exp",
		effect_value: 50,
		img_name: "exp-boosting-serum.png",
	},
	{
		uid: `I-${randomUID()}`,
		name: "Attack Boosting Potion",
		type: ITEM_TYPE.MONSTER,
		effect_property: "attack",
		effect_value: 20,
		img_name: "attack-boosting-potion.png",
	},
	{
		uid: `I-${randomUID()}`,
		name: "Defense Boosting Potion",
		type: ITEM_TYPE.MONSTER,
		effect_property: "defense",
		effect_value: 20,
		img_name: "defense-boosting-potion.png",
	},
	{
		uid: `I-${randomUID()}`,
		name: "Accelerating Battery",
		type: ITEM_TYPE.MONSTER,
		effect_property: "incubator",
		effect_value: 10,
		img_name: "accelerating-battery.png",
	},
]

const mysticItems = []

const items = [...mysticItems, ...usableItems]

export default items
