import { randomUID } from "../../util/random.js"
import GameServerSetting from "../game-server.js"
import Account from "../user/Account.js"
import Monster from "./Monster.js"

const MonsterCollection = {
	uid: `MC-${randomUID()}`,
	user_uid: Account.uid,
	monster_list: Monster.map((m) => m.uid),
	monster_team: [],
	capacity: GameServerSetting.monster_collection_limit,
}

export default MonsterCollection
