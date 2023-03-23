import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("1234567890abcdef", 10)

const MonsterType = [
	{
		uid: `MT-${nanoid()}`,
		name: "Fire",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Water",
	},
	{
		uid: `MT-${nanoid()}`,
		name: "Rock",
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
