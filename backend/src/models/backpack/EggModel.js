import { Schema, model } from "mongoose"

const EggSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
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
		hatching_time_in_seconds: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			lowercase: true,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
)

EggSchema.virtual("monsterType", {
	ref: "MonsterType",
	localField: "type_uid",
	foreignField: "uid",
	justOne: true,
})

const EggModel = model("Egg", EggSchema)

export default EggModel
