import { model, Schema } from "mongoose"

const MonsterSchema = new Schema(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
		},
		info_uid: {
			type: String,
			required: true,
			ref: "MonsterInfo",
		},
		level: {
			type: Number,
			default: 1,
		},
		exp: {
			type: Number,
			default: 0,
		},
		level_up_exp: {
			type: Number,
			required: true,
			default: 0,
		},
		attack: {
			type: Number,
			default: 0,
			required: true,
		},
		defense: {
			type: Number,
			default: 0,
			required: true,
		},
		status: {
			type: String,
			lowercase: true,
			enum: ["wild", "owned", "inactive"],
			default: "wild",
		},
	},
	{
		timestamps: true,
	}
)

MonsterSchema.virtual("info", {
	ref: "MonsterInfo",
	localField: "info_uid",
	foreignField: "uid",
	justOne: true,
})

const MonsterModel = model("Monster", MonsterSchema)

export default MonsterModel
