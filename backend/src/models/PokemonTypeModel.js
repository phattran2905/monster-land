import { Schema, model } from "mongoose"

const PokemonTypeSchema = new Schema(
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

const PokemonTypeModel = model("PokemonType", PokemonTypeSchema)

export default PokemonTypeModel
