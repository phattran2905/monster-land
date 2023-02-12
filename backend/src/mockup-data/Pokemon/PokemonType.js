import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("1234567890abcdef", 10)

const PokemonType = [
	{
		uid: `PkmT-${nanoid()}`,
		name: "Grass",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Poison",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Fire",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Flying",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Water",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Bug",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Normal",
	},
	{
		uid: `PkmT-${nanoid()}`,
		name: "Electric",
	},
]

export function findPkmTypeUID(typeName = "") {
	return PokemonType.find((i) => i.name.toLowerCase() === typeName.toLowerCase())?.uid
}

export default PokemonType
