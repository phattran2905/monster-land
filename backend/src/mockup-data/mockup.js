import PokemonInfoModel from "../models/PokemonInfoModel.js"
import PokemonTypeModel from "../models/PokemonTypeModel.js"
import PokemonModel from "../models/PokemonModel.js"
import Pokemon from "./Pokemon/Pokemon.js"
import PokemonType from "./Pokemon/PokemonType.js"
import PokemonInfo from "./Pokemon/PokemonInfo.js"

export default async function initializeMockupData() {
	try {
		await Promise.all(PokemonType.map((i) => PokemonTypeModel.create(i)))
		await Promise.all(PokemonInfo.map((i) => PokemonInfoModel.create(i)))
		await Promise.all(Pokemon.map((i) => PokemonModel.create(i)))
	} catch (error) {
		console.error(error)
	}
}
