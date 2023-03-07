import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("1234567890abcdef", 10)

const MonsterType = [
	{
		uid: `MT-${nanoid()}`,
		name: "Grass",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Poison",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Fire",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Flying",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Water",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Bug",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Normal",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Electric",
	},
]

export function findMonsterTypeUID(typeName = "") {
	return MonsterType.find((i) => i.name.toLowerCase() === typeName.toLowerCase())?.uid
}

export default MonsterType
