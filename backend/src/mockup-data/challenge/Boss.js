import { randomUID } from "../../util/random.js"
import { findMonsterTypeUID } from "../monster/MonsterType.js"

const bosses = [
	{
		uid: `B-${randomUID()}`,
		name: "Boss #4",
		type_uid: findMonsterTypeUID("rock"),
		img_name: "boss-4.png",
		attack: 220,
		defense: 220,
	},
	{
		uid: `B-${randomUID()}`,
		name: "Boss #2",
		type_uid: findMonsterTypeUID("electric"),
		img_name: "boss-2.png",
		attack: 50,
		defense: 50,
	},
	{
		uid: `B-${randomUID()}`,
		name: "Boss #3",
		type_uid: findMonsterTypeUID("fire"),
		img_name: "boss-3.png",
		attack: 100,
		defense: 100,
	},
	{
		uid: `B-${randomUID()}`,
		name: "Boss #1",
		type_uid: findMonsterTypeUID("water"),
		img_name: "boss-1.png",
		attack: 30,
		defense: 30,
	},
]

export default bosses
