import { randomUID } from "../../util/random.js"
import { findMonsterTypeUID } from "../monster/MonsterType.js"

const eggs = [
	{
		uid: `E-${randomUID()}`,
		name: "Aqua-Glow Egg",
		monster_type_uid: findMonsterTypeUID("water"),
		img_name: "aqua-glow-egg.png",
		hatching_time_in_seconds: 60,
	},
	{
		uid: `E-${randomUID()}`,
		name: "Inferno Egg",
		monster_type_uid: findMonsterTypeUID("fire"),
		hatching_time_in_seconds: 60,
		img_name: "inferno-egg.png",
	},
	{
		uid: `E-${randomUID()}`,
		name: "Lunar Egg",
		monster_type_uid: findMonsterTypeUID("rock"),
		hatching_time_in_seconds: 60,
		img_name: "lunar-egg.png",
	},
]

export default eggs
