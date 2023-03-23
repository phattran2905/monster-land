import { randomUID } from "../../util/random.js"

const MonsterType = [
	{
		uid: `MT-${randomUID()}`,
		name: "Fire",
	},
	{
		uid: `MT-${randomUID()}`,
		name: "Water",
	},
	{
		uid: `MT-${randomUID()}`,
		name: "Rock",
	},
	{
		uid: `MT-${randomUID()}`,
		name: "Electric",
	},
]

export function findMonsterTypeUID(typeName = "") {
	return MonsterType.find((i) => i.name.toLowerCase() === typeName.toLowerCase())?.uid
}

export default MonsterType
