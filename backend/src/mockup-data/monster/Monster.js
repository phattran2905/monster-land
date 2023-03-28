import { randomUID } from "../../util/random.js"
import GameServerSetting from "../game-server.js"
import { findMonsterInfoUID } from "./MonsterInfo.js"

const Monster = [
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Rockpuff"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Bouldersmash"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Pebblepaw"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Bubblebloom"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Coralcarve"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Flametail"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Emberwing"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Shockwhisker"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Thunderfuzz"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
	{
		uid: `M-${randomUID()}`,
		info_uid: findMonsterInfoUID("Sparkleap"),
		attack: 50,
		defense: 50,
		level: 1,
		level_up_exp: GameServerSetting.monster_lvl_up_exp_base,
	},
]

export default Monster
