import { Schema, model } from "mongoose"

const ChallengeSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		stage_uids: {
			type: [String],
			required: true,
		},
		trainer_level_requirement: {
			type: Number,
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
	localField: "stage_uids",
	foreignField: "uid",
})

const ChallengeModel = model("Challenge", ChallengeSchema)

export default ChallengeModel
