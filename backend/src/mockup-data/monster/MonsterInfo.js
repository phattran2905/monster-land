import { randomUID } from "../../util/random.js"
import { findMonsterTypeUID } from "./MonsterType.js"

const MonsterInfo = [
	{
		uid: `MI-${randomUID()}`,
		name: "Rockpuff",
		type_uid: findMonsterTypeUID("rock"),
		img_name: "rockpuff.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Bouldersmash",
		type_uid: findMonsterTypeUID("rock"),
		img_name: "bouldersmash.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Pebblepaw",
		type_uid: findMonsterTypeUID("rock"),
		img_name: "pebblepaw.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Bubblebloom",
		type_uid: findMonsterTypeUID("water"),
		img_name: "bubblebloom.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Coralcarve",
		type_uid: findMonsterTypeUID("water"),
		img_name: "coralcarve.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Flametail",
		type_uid: findMonsterTypeUID("fire"),
		img_name: "flametail.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Emberwing",
		type_uid: findMonsterTypeUID("fire"),
		img_name: "emberwing.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Shockwhisker",
		type_uid: findMonsterTypeUID("electric"),
		img_name: "shockwhisker.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Thunderfuzz",
		type_uid: findMonsterTypeUID("electric"),
		img_name: "thunderfuzz.png",
	},
	{
		uid: `MI-${randomUID()}`,
		name: "Sparkleap",
		type_uid: findMonsterTypeUID("electric"),
		img_name: "sparkleap.png",
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
