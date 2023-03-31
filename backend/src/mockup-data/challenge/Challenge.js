import { randomUID } from "../../util/random.js"
import stages from "./Stage.js"

const Challenges = [
	{
		uid: `C-${randomUID()}`,
		stages_uids: stages.map((stage) => stage.uid),
		trainer_level_requirement: 1,
	},
]

export default Challenges
