import { randomUID } from "../../util/random.js"
import Stages from "./Stage.js"

const Challenges = [
	{
		uid: `C-${randomUID()}`,
		stage_uids: Stages.map((stage) => stage.uid),
		trainer_level_requirement: 1,
	},
]

export default Challenges
