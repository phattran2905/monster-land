import { customAlphabet } from "nanoid"
import { findMonsterTypeUID } from "./MonsterType.js"

const nanoid = customAlphabet("1234567890abcdef", 10)

const MonsterInfo = [
	{
		uid: `MI-${nanoid()}`,
		name: "Bulbasaur",
		type: [findMonsterTypeUID("grass"), findMonsterTypeUID("poison")],
		img_name: "001.png",
		level_up_exp_rate: 90,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Ivysaur",
		type: [findMonsterTypeUID("grass"), findMonsterTypeUID("poison")],
		img_name: "002.png",
		level_up_exp_rate: 90,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Venusaur",
		type: [findMonsterTypeUID("grass"), findMonsterTypeUID("poison")],
		img_name: "003.png",
		level_up_exp_rate: 90,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Charmander",
		type: [findMonsterTypeUID("fire")],
		img_name: "004.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Charmeleon",
		type: [findMonsterTypeUID("fire")],
		img_name: "005.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Charizard",
		type: [findMonsterTypeUID("fire")],
		img_name: "006.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Squirtle",
		type: [findMonsterTypeUID("water")],
		img_name: "007.png",
		level_up_exp_rate: 80,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Wartortle",
		type: [findMonsterTypeUID("water")],
		img_name: "008.png",
		level_up_exp_rate: 80,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Blastoise",
		type: [findMonsterTypeUID("water")],
		img_name: "009.png",
		level_up_exp_rate: 80,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Caterpie",
		type: [findMonsterTypeUID("bug")],
		img_name: "010.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Metapod",
		type: [findMonsterTypeUID("bug")],
		img_name: "011.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Butterfree",
		type: [findMonsterTypeUID("bug"), findMonsterTypeUID("flying")],
		img_name: "012.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Weedle",
		type: [findMonsterTypeUID("bug"), findMonsterTypeUID("poison")],
		img_name: "013.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Kakuna",
		type: [findMonsterTypeUID("bug"), findMonsterTypeUID("poison")],
		img_name: "014.png",
		level_up_exp_rate: 60,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Beedrill",
		type: [findMonsterTypeUID("bug"), findMonsterTypeUID("poison")],
		img_name: "015.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Pidgey",
		type: [findMonsterTypeUID("normal"), findMonsterTypeUID("flying")],
		img_name: "016.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Pidgeotto",
		type: [findMonsterTypeUID("normal"), findMonsterTypeUID("flying")],
		img_name: "017.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Pidgeot",
		type: [findMonsterTypeUID("normal"), findMonsterTypeUID("flying")],
		img_name: "018.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Rattata",
		type: [findMonsterTypeUID("normal")],
		img_name: "019.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Raticate",
		type: [findMonsterTypeUID("normal")],
		img_name: "020.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Spearow",
		type: [findMonsterTypeUID("normal"), findMonsterTypeUID("flying")],
		img_name: "021.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Fearow",
		type: [findMonsterTypeUID("normal"), findMonsterTypeUID("flying")],
		img_name: "022.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Ekans",
		type: [findMonsterTypeUID("poison")],
		img_name: "023.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Arbok",
		type: [findMonsterTypeUID("poison")],
		img_name: "024.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Pikachu",
		type: [findMonsterTypeUID("electric")],
		img_name: "025.png",
		level_up_exp_rate: 65,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Raichu",
		type: [findMonsterTypeUID("electric")],
		img_name: "026.png",
		level_up_exp_rate: 70,
	},
	{
		uid: `MI-${nanoid()}`,
		name: "Pichu",
		type: [findMonsterTypeUID("electric")],
		img_name: "172.png",
		level_up_exp_rate: 60,
	},
]

export function findMonsterInfoUID(monsterName = "") {
	return MonsterInfo.find((i) => i.name.toLowerCase() === monsterName.toLowerCase())?.uid
}

export function calcLevelUpExp(monsterName = "", currentLvlUpExp = 1) {
	const monsterInfo = MonsterInfo.find(
		(i) => i.name.toLowerCase() === monsterName.toLowerCase()
	)?.uid
	const lvlUpRate = monsterInfo.level_up_exp_rate / 100 + 1
	return lvlUpRate * currentLvlUpExp
}

export default MonsterInfo
