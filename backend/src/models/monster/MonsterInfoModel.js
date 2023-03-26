import { model, Schema } from "mongoose"

const MonsterInfoSchema = new Schema(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			unique: true,
			required: true,
			capitalize: true,
		},
		type: {
			type: String,
			required: true,
		},
		img_name: {
			type: String,
			required: true,
			lowercase: true,
		},
		status: {
			type: String,
			lowercase: true,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
)

MonsterInfoSchema.virtual("monsterType", {
	ref: "MonsterType",
	localField: "type",
	foreignField: "uid",
	justOne: true,
})

const MonsterInfoModel = model("MonsterInfo", MonsterInfoSchema)

export default MonsterInfoModel
