import { Schema, model } from "mongoose"

const ChallengeSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		stages: {
			type: [Object], // {uid, level}
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
)

ChallengeSchema.virtual("stage_info", {
	ref: "Stage",
	localField: "stages.uid",
	foreignField: "uid",
})

const ChallengeModel = model("Challenge", ChallengeSchema)

export default ChallengeModel
