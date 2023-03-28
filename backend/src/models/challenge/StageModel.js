import { Schema, model } from "mongoose"

const StageSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		boss_name: {
			type: String,
			required: true,
			unique: true,
		},
		boss_img_name: {
			type: String,
			required: true,
		},
		boss_type_uid: {
			type: String,
			required: true,
		},
		boss_attack: {
			type: Number,
			required: true,
		},
		boss_defense: {
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

StageSchema.virtual("boss_type", {
	ref: "MonsterType",
	localField: "boss_type_uid",
	foreignField: "uid",
	justOne: true,
})

StageSchema.virtual("reward_detailed_items", {
	ref: "Item",
	localField: "reward_items.uid",
	foreignField: "uid",
})

StageSchema.virtual("reward_detailed_eggs", {
	ref: "Egg",
	localField: "reward_eggs.uid",
	foreignField: "uid",
})

const StageModel = model("Stage", StageSchema)

export default StageModel
