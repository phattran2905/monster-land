import { Schema, model } from "mongoose"

const ItemSchema = new Schema(
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
			capitalize: true,
		},
		type: {
			type: String,
			required: true,
			lowercase: true,
			enum: ["monster", "incubator"],
		},
		effect_property: {
			type: String,
			lowercase: true,
			required: true,
		},
		effect_value: {
			type: Number,
			required: true,
		},
		img_name: {
			type: String,
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

const ItemModel = model("Item", ItemSchema)

export default ItemModel
