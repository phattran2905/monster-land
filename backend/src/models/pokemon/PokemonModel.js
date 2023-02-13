import { model, Schema } from "mongoose"

const PokemonSchema = new Schema(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
		},
		info_uid: {
			type: String,
			required: true,
			ref: "PokemonInfo",
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
		},
		power: {
			type: Number,
			required: true,
		},
		capture_rate: {
			type: Number,
			default: 0,
			max: 100,
			min: 0,
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

PokemonSchema.virtual("info", {
	ref: "PokemonInfo",
	localField: "info_uid",
	foreignField: "uid",
	justOne: true,
})

const PokemonModel = model("Pokemon", PokemonSchema)

export default PokemonModel
