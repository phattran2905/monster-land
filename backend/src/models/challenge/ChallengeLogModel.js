import { Schema, model } from "mongoose"

const ChallengeLogSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		user_uid: {
			type: String,
			required: true,
		},
		challenge_uid: {
			type: String,
			required: true,
		},
		finished_stages: {
			type: [String],
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "done"],
			default: "active",
		},
	},
	{ timestamps: true }
)

ChallengeLogSchema.virtual("user_info", {
	ref: "Account",
	localField: "user_uid",
	foreignField: "uid",
	justOne: true,
})

ChallengeLogSchema.virtual("challenge_info", {
	ref: "Challenge",
	localField: "challenge_uid",
	foreignField: "uid",
	justOne: true,
})

ChallengeLogSchema.virtual("finished_stage_info", {
	ref: "Stage",
	localField: "finished_stages",
	foreignField: "uid",
	justOne: true,
})

const ChallengeLogModel = model("ChallengeLog", ChallengeLogSchema)

export default ChallengeLogModel
