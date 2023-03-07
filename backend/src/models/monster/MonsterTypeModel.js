import { Schema, model } from "mongoose"

const MonsterTypeSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			unique: true,
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

const MonsterTypeModel = model("MonsterType", MonsterTypeSchema)

export default MonsterTypeModel
