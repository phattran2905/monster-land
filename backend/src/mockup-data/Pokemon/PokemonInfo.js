import { customAlphabet } from "nanoid"
import { findPkmTypeUID } from "./PokemonType.js"

const nanoid = customAlphabet("1234567890abcdef", 10)

const PokemonInfo = [
	{
		uid: `PkmI-${nanoid()}`,
		name: "Bulbasaur",
		type: [findPkmTypeUID("grass"), findPkmTypeUID("poison")],
		img_name: "001.png",
		level_up_exp_rate: 90,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Ivysaur",
		type: [findPkmTypeUID("grass"), findPkmTypeUID("poison")],
		img_name: "002.png",
		level_up_exp_rate: 90,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Venusaur",
		type: [findPkmTypeUID("grass"), findPkmTypeUID("poison")],
		img_name: "003.png",
		level_up_exp_rate: 90,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Charmander",
		type: [findPkmTypeUID("fire")],
		img_name: "004.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Charmeleon",
		type: [findPkmTypeUID("fire")],
		img_name: "005.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Charizard",
		type: [findPkmTypeUID("fire")],
		img_name: "006.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Squirtle",
		type: [findPkmTypeUID("water")],
		img_name: "007.png",
		level_up_exp_rate: 80,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Wartortle",
		type: [findPkmTypeUID("water")],
		img_name: "008.png",
		level_up_exp_rate: 80,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Blastoise",
		type: [findPkmTypeUID("water")],
		img_name: "009.png",
		level_up_exp_rate: 80,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Caterpie",
		type: [findPkmTypeUID("bug")],
		img_name: "010.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Metapod",
		type: [findPkmTypeUID("bug")],
		img_name: "011.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Butterfree",
		type: [findPkmTypeUID("bug"), findPkmTypeUID("flying")],
		img_name: "012.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Weedle",
		type: [findPkmTypeUID("bug"), findPkmTypeUID("poison")],
		img_name: "013.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Kakuna",
		type: [findPkmTypeUID("bug"), findPkmTypeUID("poison")],
		img_name: "014.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Beedrill",
		type: [findPkmTypeUID("bug"), findPkmTypeUID("poison")],
		img_name: "015.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Pidgey",
		type: [findPkmTypeUID("normal"), findPkmTypeUID("flying")],
		img_name: "016.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Pidgeotto",
		type: [findPkmTypeUID("normal"), findPkmTypeUID("flying")],
		img_name: "017.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Pidgeot",
		type: [findPkmTypeUID("normal"), findPkmTypeUID("flying")],
		img_name: "018.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Rattata",
		type: [findPkmTypeUID("normal")],
		img_name: "019.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Raticate",
		type: [findPkmTypeUID("normal")],
		img_name: "020.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Spearow",
		type: [findPkmTypeUID("normal"), findPkmTypeUID("flying")],
		img_name: "021.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Fearow",
		type: [findPkmTypeUID("normal"), findPkmTypeUID("flying")],
		img_name: "022.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Ekans",
		type: [findPkmTypeUID("poison")],
		img_name: "023.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Arbok",
		type: [findPkmTypeUID("poison")],
		img_name: "024.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Pikachu",
		type: [findPkmTypeUID("electric")],
		img_name: "025.png",
		level_up_exp_rate: 65,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Raichu",
		type: [findPkmTypeUID("electric")],
		img_name: "026.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `PkmI-${nanoid()}`,
		name: "Pichu",
		type: [findPkmTypeUID("electric")],
		img_name: "172.png",
		level_up_exp_rate: 60,
	},
]

export function findPkmInfoUID(pkmName = "") {
	return PokemonInfo.find((i) => i.name.toLowerCase() === pkmName.toLowerCase())?.uid
}

export function calcLevelUpExp(pkmName = "", currentLvlUpExp = 1) {
	const pkmInfo = PokemonInfo.find((i) => i.name.toLowerCase() === pkmName.toLowerCase())?.uid
	const lvlUpRate = pkmInfo.level_up_exp_rate / 100 + 1
	return lvlUpRate * currentLvlUpExp
}

export default PokemonInfo
