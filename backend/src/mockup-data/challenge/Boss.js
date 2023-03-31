import { randomUID } from "../../util/random.js"
import { findMonsterInfoUID } from "../monster/MonsterInfo.js"

const bosses = [
	{
		uid: `B-${randomUID()}`,
		name: "Boss #1",
		type_uid: findMonsterInfoUID("rock"),
		img_name: "boss-1.png",
		attack: 30,
		defense: 30,
	},
	{
		uid: `B-${randomUID()}`,
		name: "Boss #2",
		type_uid: findMonsterInfoUID("electric"),
		img_name: "boss-2.png",
		attack: 50,
		defense: 50,
	},
	{
		uid: `B-${randomUID()}`,
		name: "Boss #3",
		type_uid: findMonsterInfoUID("fire"),
		img_name: "boss-3.png",
		attack: 100,
		defense: 100,
	},
	{
		uid: `B-${randomUID()}`,
		name: "Boss #4",
		type_uid: findMonsterInfoUID("water"),
		img_name: "boss-4.png",
		attack: 220,
		defense: 220,
	},
]

export default bosses
