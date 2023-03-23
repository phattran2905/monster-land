import account from "./Account.js"
import { randomUID } from "../../util/random.js"

const Trainer = {
	uid: `T-${randomUID()}`,
	user_uid: account.uid,
	name: "Test",
	gender: "male",
	avatar: "avatar.png",
}

export default Trainer
