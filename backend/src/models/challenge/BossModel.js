import { Schema, model } from "mongoose"

const BossSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			unique: true,
			required: true,
		},
		type_uid: {
			type: String,
			required: true,
		},
		img_name: {
			type: String,
			required: true,
		},
		attack: {
			type: Number,
			required: true,
		},
		defense: {
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

BossSchema.virtual("monsterType", {
	ref: "MonsterType",
	localField: "type_uid",
	foreignField: "uid",
	justOne: true,
})

const BossModel = model("Boss", BossSchema)

export default BossModel
