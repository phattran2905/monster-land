import { model, Schema } from "mongoose"

const PokemonInfoSchema = new Schema(
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
			type: [String],
			required: true,
		},
		img_name: {
			type: String,
			required: true,
		},
		level_up_exp_rate: {
			type: Number,
			required: true,
			default: 1,
			min: 1,
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

PokemonInfoSchema.virtual("pkmType", {
	ref: "PokemonType",
	localField: "type",
	foreignField: "uid",
})

const PokemonInfoModel = model("PokemonInfo", PokemonInfoSchema)

export default PokemonInfoModel
