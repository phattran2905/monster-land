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

// Populate to items to get data for storing items
BackpackSchema.virtual("items", {
	ref: "Item",
	localField: "item_list.item_uid",
	foreignField: "uid",
})

const BackpackModel = model("Backpack", BackpackSchema)

export default BackpackModel
