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
			type: Object, // {egg: 50, item: 50}
			required: true,
			default: { egg: 1, item: 1 },
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
	localField: "item_list.uid",
	foreignField: "uid",
})

// Populate to eggs to get egg data
BackpackSchema.virtual("eggs", {
	ref: "Egg",
	localField: "egg_list.uid",
	foreignField: "uid",
})

const BackpackModel = model("Backpack", BackpackSchema)

export default BackpackModel
