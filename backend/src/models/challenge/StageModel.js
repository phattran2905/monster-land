import { Schema, model } from "mongoose"

const StageSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		boss_uid: {
			type: String,
			required: true,
		},
		difficulty_level: {
			type: Number,
			required: true,
		},
		reward_exp: {
			type: Number,
			required: true,
		},
		reward_coins: {
			type: Number,
			required: true,
		},
		reward_items: {
			type: [Object], // {uid, amount}
			required: true,
		},
		reward_eggs: {
			type: [Object], // {uid, amount}
			required: true,
		},
		stamina_cost: {
			type: Number,
			required: true,
			default: 0,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
)

StageSchema.virtual("boss_info", {
	ref: "Boss",
	localField: "boss_uid",
	foreignField: "uid",
	justOne: true,
})

StageSchema.virtual("detailed_reward_items", {
	ref: "Item",
	localField: "reward_items.uid",
	foreignField: "uid",
})

StageSchema.virtual("detailed_reward_eggs", {
	ref: "Egg",
	localField: "reward_eggs.uid",
	foreignField: "uid",
})

const StageModel = model("Stage", StageSchema)

export default StageModel
