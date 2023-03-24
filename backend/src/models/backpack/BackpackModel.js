import { Schema, model } from "mongoose"

const BackpackSchema = new Schema(
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
		},
		item_list: {
			type: [Object], // {item_uid, amount}
			default: [],
		},
		egg_list: {
			type: [Object], // {egg_uid, amount}
			default: [],
		},
		capacity: {
			type: Number,
			default: 50,
			min: 1,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
)

// Populate to items to get item data
BackpackSchema.virtual("items", {
	ref: "Item",
	localField: "item_list.item_uid",
	foreignField: "uid",
})

// Populate to eggs to get egg data
BackpackSchema.virtual("eggs", {
	ref: "Egg",
	localField: "egg_list.egg_uid",
	foreignField: "uid",
})

const BackpackModel = model("Backpack", BackpackSchema)

export default BackpackModel
