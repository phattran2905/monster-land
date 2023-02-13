import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("1234567890abcdef", 10)
const ITEM_TYPE = {
	MYSTIC: "mystic",
	USABLE: "usable",
}

const usableItems = [
	{
		uid: `I-${nanoid()}`,
		name: "Bread",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 15,
		img_name: "Bread.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Chicken",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 50,
		img_name: "Chicken.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Cookie",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 10,
		img_name: "Cookie.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Corn",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 10,
		img_name: "Corn.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Drumstick",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 20,
		img_name: "Drumstick.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Flower",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 5,
		img_name: "Flower.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Grass",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 5,
		img_name: "Grass.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Pie",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 25,
		img_name: "Pie.png",
	},
	{
		uid: `I-${nanoid()}`,
		name: "Pumpkin",
		type: ITEM_TYPE.USABLE,
		effect_property: "capture-rate",
		effect_value: 35,
		img_name: "Pumpkin.png",
	},
]

const mysticItems = []

const items = [...mysticItems, ...usableItems]

export default items
