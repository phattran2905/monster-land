import account from "./Account.js"
import { randomUID } from "../../util/random.js"
import GameServerSetting from "../game-server.js"

const Trainer = {
	uid: `T-${randomUID()}`,
	user_uid: account.uid,
	name: "Test",
	avatar: "body-1.png",
	level_up_exp: GameServerSetting.trainer_lvl_up_exp_base,
	stamina: 100,
}

export default Trainer
