import { randomUID } from "../../util/random.js"
import Account from "../user/Account.js"
import Monster from "./Monster.js"

const MonsterCollection = {
	uid: `MC-${randomUID()}`,
	user_uid: Account.uid,
	monster_list: Monster.map((m) => m.uid),
	monster_team: [],
	capacity: 50,
}

export default MonsterCollection
