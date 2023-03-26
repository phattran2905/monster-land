import account from "./Account.js"
import { randomUID } from "../../util/random.js"
import GameServerSetting from "../game-server.js"

const Trainer = {
	uid: `T-${randomUID()}`,
	user_uid: account.uid,
	name: "Test",
	avatar: "avatar.png",
	level_up_exp: GameServerSetting.trainer_lvl_up_exp_base,
}

export default Trainer
