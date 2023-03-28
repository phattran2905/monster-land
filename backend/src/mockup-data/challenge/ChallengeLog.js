import { randomUID } from "../../util/random.js"
import Account from "../user/Account.js"
import Challenges from "./Challenge.js"

const ChallengeLog = [{
	uid: `CL-${randomUID()}`,
	user_uid: Account.uid,
	challenge_uid: Challenges[0].uid,
	finished_stages: [],
}]

export default ChallengeLog
