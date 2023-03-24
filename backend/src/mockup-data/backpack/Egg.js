import { randomUID } from "../../util/random.js"
import { findMonsterTypeUID } from "../monster/MonsterType.js"

const eggs = [
	{
		uid: `E-${randomUID()}`,
		name: "Aqua-Glow Egg",
		type_uid: findMonsterTypeUID("water"),
		img_name: "aqua-glow-egg.png",
		hatching_time_in_seconds: 120,
	},
	{
		uid: `E-${randomUID()}`,
		name: "Inferno Egg",
		type_uid: findMonsterTypeUID("fire"),
		hatching_time_in_seconds: 120,
		img_name: "inferno-egg.png",
	},
	{
		uid: `E-${randomUID()}`,
		name: "Lunar Egg",
		type_uid: findMonsterTypeUID("rock"),
		hatching_time_in_seconds: 120,
		img_name: "lunar-egg.png",
	},
]

export default eggs
