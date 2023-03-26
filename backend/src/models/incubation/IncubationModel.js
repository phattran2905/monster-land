import { Schema, model } from "mongoose"

const IncubationSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		user_uid: {
			type: String,
			required: true,
		},
		egg_uid: {
			type: String,
			required: true,
		},
		done_hatching_time: {
			type: Date,
			required: true,
		},
		incubator_img: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
			enum: ["incubating", "done"],
			default: "incubating",
		},
	},
	{ timestamps: true }
)

IncubationSchema.virtual("egg_info", {
	ref: "Egg",
	localField: "egg_uid",
	foreignField: "uid",
	justOne: true,
})

const IncubationModel = model("Incubation", IncubationSchema)

export default IncubationModel
