import { model, Schema } from "mongoose"

const PokemonSchema = new Schema(
	{
		uid: {
			type: String,
			unique: true,
			required: true,
		},
		info_id: {
			type: String,
			required: true,
		},
		level: {
			type: Number,
			default: 1,
		},
		exp: {
			type: Number,
			default: 0,
		},
		power: {
			type: Number,
			default: 0,
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
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
)

const PokemonModel = model("Pokemon", PokemonSchema)

export default PokemonModel
