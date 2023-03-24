import { Schema, model } from "mongoose"

const TrainerSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		user_uid: {
			type: String,
			required: true,
			unique: true,
			ref: "Account",
		},
		name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: null,
			required: true,
		},
		level: {
			type: Number,
			default: 1,
		},
		exp: {
			type: Number,
			default: 0,
			required: true,
		},
		level_up_exp: {
			type: Number,
			required: true,
			default: 1000,
		},
		gold: {
			type: Number,
			default: 0,
		},
		diamond: {
			type: Number,
			default: 0,
		},
		stamina: {
			type: Number,
			default: 0,
		},
		max_stamina: {
			type: Number,
			required: true,
			default: 100,
		},
		status: {
			type: String,
			default: "active",
			enum: ["active", "inactive"],
		},
	},
	{ timestamps: true }
)

TrainerSchema.virtual("account", {
	ref: "Account",
	localField: "user_uid",
	foreignField: "uid",
	justOne: true,
})

const TrainerModel = model("Trainer", TrainerSchema)

export default TrainerModel
